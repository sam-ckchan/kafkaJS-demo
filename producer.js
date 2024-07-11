const kafka = require("./kafkaClient")
const producer = kafka.producer()

const msgValue = process.argv[2] // command line argument as message

const producerInit = async () => {
    console.log("connecting to kafka broker...")
    await producer.connect()
    console.log("successfully connected to kafka \nsending a message to kafka...")
    await producer.send({
            topic: "user-topic",
            messages: [{
                key: "withdraw", //  producer can use key-based, partition number or default rrb to assign partitions
                value: msgValue //  Buffer | string | null
            }]
        }
    )
    await producer.disconnect()
    console.log("message sent \ndisconnect now...")
}

process.env.KAFKAJS_NO_PARTITIONER_WARNING ="1";
producerInit().catch(e => console.error(e))




