const kafka = require("./kafkaClient")
const consumerWithdraw = kafka.consumer({groupId: "user-handlers"}) // assign to consumerWithdraw group

const consumerStart = async () => {
    console.log("connecting to kafka broker...")
    await consumerWithdraw.connect()
    await consumerWithdraw.subscribe({topic: "user-topic", fromBeginning: true})
    console.log("successfully connected to kafka, listening on user-topic")
    await consumerWithdraw.run(
        {
            eachMessage: async ({topic, message}) => {
                const {value, key, offset} = message
                console.log(`Received message: ${value.toString()}`)
                console.log(`Topic: ${topic} | Key: ${key} | Offset: ${offset}`)
                console.log(`--------------END---------------`)
            }
        }
    )
//KafkaJS use consumer partition assignment by default, can configure using key-based etc..
}

consumerStart().catch(e => console.error(e))
