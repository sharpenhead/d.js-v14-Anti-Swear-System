# d.js-v14-Anti-Swear-System
This repository includes a simple anti-swear system for your Discord bot, with the ability to enable and disable it for your Discord server.

### `❓` **Purpose:**
This is an anti-swear system with the options to enable and disable it for your server, as well as the ability to log any violations in a specified channel.

### `⚠️` **Warning:**
When copying over the files from this repository, remember to adjust the file paths to match the files on your bot. Also remember to modify the embed colors to your preference.

### `❗` **Requirements:**
You need the antiscam schema for this command to work.

**⤷ Location:** [d.js-v14-Anti-Swear-System/Models/antiscam.js](https://github.com/sharpenhead/d.js-v14-Anti-Swear-System/blob/main/Models/antiswear.js)

**⤷ Location:** [d.js-v14-Anti-Swear-System/Models/antiscamLogChannel.js](https://github.com/sharpenhead/d.js-v14-Anti-Swear-System/blob/main/Models/antiswearLogChannel.js)

**⤷** `📁` Place these two in the folder where you keep all your schemas.

**──────────────────────**

Then you need the messageCreate event.

**⤷ Location:** [d.js-v14-Anti-Swear-System/Events/Client/antiscammessageCreate.js](https://github.com/sharpenhead/d.js-v14-Anti-Swear-System/blob/main/Events/Client/antiswearmessageCreate.js)

**⤷** `📁` Place in `Events > Client`.

**──────────────────────**

Finally, download the badwords.json file or paste the contents into a new file.

**⤷ Location:** [d.js-v14-Anti-Swear-System/badwords.json](https://github.com/sharpenhead/d.js-v14-Anti-Swear-System/blob/main/badwords.json)

**⤷** `📁` Place outside of all the folders; where you keep your `index.js` file.

### `🔧` **Command:**
- /setup-antiswear **➜** Allows admins to enable or disable the anti-swear system.

### `💳` **Credits:**
- Credits to LightAndy#7161 (Discord ID: 816358066123309129) for supplying the messageCreate and badwords.json files.
- Credits to shoczy#9003 (Discord ID: 709393455519891486) for providing the foundation for the enable and disable system.

### `📝` **Side note:**
Please contact me via Discord, RexoPlays's brother#3085, if you have any questions, problems with the system, or if a step is unclear, and I will try my best to assist you!
