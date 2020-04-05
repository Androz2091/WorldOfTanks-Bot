const { ShardingManager } = require("discord.js");
const manager = new ShardingManager("./index.js", { token: require("./config").token });

manager.spawn(2);
manager.on("launch", (shard) => console.log("Shard #"+shard.id+" launched!"));
