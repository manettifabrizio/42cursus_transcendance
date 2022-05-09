import { useReducer } from "react";
import { StringLiteralLike } from "typescript";

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export class ChatAPI {

    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async getChannels() {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
                console.log('No channels')
                return null;
            })
            console.log(resp)
         return resp
    }

        // ${process.env.REACT_APP_GET_CHANNELS_NAMES}
        public static async getChannelsNames(): Promise<string[]|null> {
            const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_NAMES}`, {
                method: "GET",
                credentials: "include"})
                .then(response => {return response.json()})
                .then(json => {return json})
                .catch(err => {
                    console.log('No channels')
                    return null;
                })
                console.log(resp)
             return resp
        }

    // ${process.env.REACT_APP_GET_CHANNELS_ID}
    public static async getChannelById(id: number) {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_ID}${id}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log("Id name not found")
                return null;
            })
        return resp
    }
    public static async getChannelByName(name: string) {
        const resp = await fetch(`${process.env.REACT_APP_GET_CHANNELS_BY_NAME}${name}`, {
            method: "GET",
            credentials: "include"})
            .then(response => {return response.json()}).then(json => {return json})
            .catch(err => {
                console.log("Channel name not found")
                return null;
            })
        return resp
    }
    // ${process.env.REACT_APP_GET_CHANNELS}
    public static async addChannel(name: string, ownerId: number, visibility: string, password?: any) {
        const body = (password && visibility == 'protected') ? JSON.stringify({name, ownerId, visibility, password}) : JSON.stringify({name, ownerId, visibility});
        let ret = true;
        await fetch(`${process.env.REACT_APP_GET_CHANNELS}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body,
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }
    
    public static async addMsg(createdat: Date,content: string,author: any,channel: any) {
        let ret = true;
        await fetch(`https://serv.pizzagami.fr:${process.env.https}/api/messages`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({createdat: createdat,content: content, author: author, channel: channel}),
        credentials: "include"})
        .then(handleErrors)
        .catch(err => {
            console.log(err);
            ret = false;
        })
        return ret;
    }

}