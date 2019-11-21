const Trello = require('trello');
const fs = require('fs');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const userToken = process.env.TOKEN;
const boardName = process.env.BOARD;
const trello = new Trello(apiKey, userToken);

async function main(addToList, fileName) {
  const boards = await trello.getBoards('felipecoury');
  const board = boards.find(b => b.name === boardName);
  const lists = await trello.getListsOnBoard(board.id);
  console.log('addToList', addToList);
  const list = lists.find(l => l.name === addToList)
  const file = fs.readFileSync(fileName, 'utf8');
  await file.split('\n').forEach(async line => {
    const card = await trello.addCard(line, null, list.id);
  });
}

main(process.argv[2], process.argv[3]);
