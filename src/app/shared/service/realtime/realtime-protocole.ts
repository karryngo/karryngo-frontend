export const UNKNOW_SENDER="unknow";
export const UNKNOW_RECEIVER="unknow";

export enum RealTimeInitMessageType
{
 SEND_MESSAGE,   
 NEW_CONNECTION="connect",
 LOGGIN="loggin",
 LOGOUT="logout",
 DISCONNECT="disconnect"
}

export enum RealTimeInitErrorType
{
    SUCCESS,
    USER_ALREADY_EXIST,
    INVALID_USER_ID,
    INVALID_USER_TOKEN,
    UNKNOW_ERROR,
    USER_ALREADY_CONNECTED,
    CONNEXION_ERROR="connect_error",
    CONNEXION_TIME_OUT="connect_timeout"
}

export enum RealTimeChatMessageType 
{
    SEND_MESSAGE="send_message",
    GET_DISCUSSIONS="get_discussions",
    GET_MESSAGE_OF_DISCUSION="get_message_discussion",
    MARK_MESSAGE_AS_READ="mark_message_as_read"
}

export enum RealTimeChatError
{
    MESSAGE_NOT_EXIST,   
}


export enum RealTimeTransactionMessageType 
{
    GET_TRANSACTION="get_transaction",
}


export enum RealTimeTransactionError
{
    TRANSACTION_NOT_EXIST,   
}

export enum RealTimeChatMessageUpdateDataType
{
    PACKAGE_UPDATED="package_update",
}

export interface RealTimeUpdateData
{
    type:RealTimeChatMessageUpdateDataType
    data:Record<string,any>
}

export interface RealTimeMessage{
    senderID:string,
    receiverID:string,
    data?:any | RealTimeUpdateData,
    type:RealTimeMessageType,
    subtype?:RealTimeSubMessageType,
    error?:RealTimeErrorType
}


export type RealTimeMessageType = RealTimeInitMessageType | RealTimeChatMessageType | RealTimeTransactionMessageType;
export type RealTimeErrorType = RealTimeInitErrorType | RealTimeChatError | RealTimeTransactionError;

export type RealTimeSubMessageType = RealTimeUpdateData;