import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

interface MessageBody{
  chanName: string;
  authorId: number;
  content: string; 
}

@WebSocketGateway({cors: {origin : 6200}, namespace: '/chat'})
export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: Server) {
  }

  handleJoinChannel() {
    console.log('bonjour')
    this.server.to('general').emit('service', {authorId: 1, content: 'JOINED'})
  }

  async handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
  }
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: MessageBody
  ) {
    console.log('Received message:');
    console.log(data);
    this.server.to(data.chanName).emit('message', {authorId: data.authorId, content: data.content});
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data: any) {
    socket.join(data.name);
    console.log(`Client [${socket.id}] joined Room ${data.name}`);
    socket.emit('joinedRoom', data.name);
  }

  @SubscribeMessage('leaveRoom')
  handleLeftRoom(socket: Socket, data: any) {
    socket.leave(data.name);
    console.log(`Client [${socket.id}] left Room ${data.name}`);
    socket.emit('leftRoom', data.name);
  }
}
