/* eslint-disable no-console */
import { io } from "socket.io-client";
import { API_BASE } from "../constants";

const socket = io(API_BASE, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(`WS EVENT ${event}`, args);
});

socket.on("connect_error", (err) => {
  console.log("SOCKET ERROR", err);
});

export default socket;
