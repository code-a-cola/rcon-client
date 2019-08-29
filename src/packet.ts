export interface Packet {
  id: number
  type: number
  payload: string
}

export function encodePacket(body: Packet): Buffer {
  console.log(body);
  var size = Buffer.byteLength(body.payload) + 14,
    buffer = new Buffer(size);
  buffer.writeInt32LE(size - 4, 0);
  buffer.writeInt32LE(body.id, 4);
  buffer.writeInt32LE(body.type, 8);
  buffer.write(body.payload, 12, size - 2, "ascii");
  buffer.writeInt16LE(0, size - 2);
  return buffer;
}

export function decodePacket(buffer: Buffer): Packet {
  console.log(buffer);
  var response = {
    size: buffer.readInt32LE(0),
    id: buffer.readInt32LE(4),
    type: buffer.readInt32LE(8),
    payload: buffer.toString("ascii", 12, buffer.length - 2),
  };
  return response;
}

export enum PacketType {
  Auth = 3,
  AuthResponse = 2,
  Command = 2,
  CommandResponse = 0
}
