const { Rcon } = require("../lib/rcon")

async function main() {
    const rcon = new Rcon({
        host: "68.232.163.112",
        port: 9046,
        password: "Cyanide415!"
    })

    rcon.on("connect", () => console.log("connected"))
    rcon.on("authenticated", () => console.log("authenticated"))
    rcon.on("end", () => console.log("end"))

    await rcon.connect()

    console.log(await rcon.send('say "this is a test"'))

    rcon.end()
}

main().catch(console.error)
