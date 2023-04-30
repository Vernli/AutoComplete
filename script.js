class Node {
  constructor() {
    this.links = new Array(26);
    this.flag = false;
  }
  containsKey(key) {
    return this.links[key.charCodeAt(0) - "a".charCodeAt(0)] != null;
  }
  put(ch, node) {
    this.links[ch.charCodeAt(0) - "a".charCodeAt(0)] = node;
  }
  get(ch) {
    return this.links[ch.charCodeAt(0) - "a".charCodeAt(0)];
  }
  setEnd() {
    this.flag = true;
  }
  isEnd() {
    return this.flag;
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.containsKey(word[i])) {
        node.put(word[i], new Node());
      }
      node = node.get(word[i]);
    }
    node.setEnd();
  }
  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.containsKey(word[i])) {
        return false;
      }
      node = node.get(word[i]);
    }
    return node.isEnd();
  }
  startsWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!node.containsKey(prefix[i])) {
        return false;
      }
      node = node.get(prefix[i]);
    }
    return true;
  }
  autoComplete(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      if (!node.containsKey(prefix[i])) {
        return [];
      }
      node = node.get(prefix[i]);
    }

    let words = [];
    this.collect(node, prefix, words);
    return words;
  }

  collect(node, prefix, words) {
    if (node == null) return;

    if (node.isEnd()) words.push(prefix);

    for (let c = 0; c < 26; c++) {
      let ch = String.fromCharCode("a".charCodeAt(0) + c);
      this.collect(node.get(ch), prefix + ch, words);
    }
  }
}
let trie = new Trie();

// Auto Complete
trie.insert("car");
trie.insert("carpet");
trie.insert("java");
trie.insert("javascript");
trie.insert("internet");
console.log(trie.autoComplete("c"));
console.log(trie.autoComplete("ca"));
console.log(trie.autoComplete("carp"));
console.log(trie.autoComplete("jav"));
console.log(trie.autoComplete("intern"));
console.log(trie.autoComplete("foo"));

const wordForm = document.querySelector("#word-form");
const dirInput = document.querySelector("#dir-input");

const userForm = document.querySelector("#user-form");
const userInput = document.querySelector("#user-inp");
const autoComplete = document.querySelector(".autocomplete-words");

function addWord(e) {
  e.preventDefault();
  const input = dirInput.value.split(" ")[0].toLowerCase();
  autoCompleteElements = createList(".word");
  if (input === "") {
    alert("Input is Empty!");
    return;
  }
  if (autoCompleteElements.includes(input)) {
    alert("Value is here!");
    return;
  }
  const words = document.getElementById("words");
  const div = document.createElement("div");
  div.classList.add("word");
  div.innerText = input;
  trie.insert(input);
  words.appendChild(div);
  dirInput.value = "";
}

function addText(e) {
  e.preventDefault();
  if (userInput.value === "") {
    alert("Input is Empty!");
    return;
  }
  const sentences = document.querySelector(".sentences");
  const div = document.createElement("div");
  div.classList.add("sentence");
  div.innerText = userInput.value;
  sentences.appendChild(div);
  userInput.value = "";
}

function createList(element) {
  const elementList = document.querySelectorAll(`${element}`);
  const list = new Array();
  elementList.forEach((el) => list.push(el.textContent));
  return list;
}

function checkLength(item, where) {
  const list = createList(`${where}`);
  return item.length < list.length;
}

function checkIfItemExists(item) {
  return createList(".suggestion").includes(item);
}

function clearElement() {
  const suggestion = document.querySelectorAll(".suggestion");
  suggestion.forEach((el) => el.remove());
}

function addSuggestion() {
  const input = userInput.value.split(" ");
  const inputLast = input[input.length - 1];
  if (inputLast === "") {
    clearElement();
    return;
  }
  const words = trie.autoComplete(inputLast);
  if (checkLength(words)) {
    clearElement();
  }

  words.forEach((el) => {
    if (checkIfItemExists(el, ".suggestion")) return;
    const div = document.createElement("div");
    div.classList.add("suggestion");
    div.innerText = el;
    autoComplete.appendChild(div);
  });
}

function Init() {
  wordForm.addEventListener("submit", addWord);
  userInput.addEventListener("keyup", addSuggestion);
  autoComplete.addEventListener("click", (e) => {
    if (e.target.classList[0] === "suggestion") {
      const input = userInput.value.split(" ");
      input[input.length - 1] = e.target.textContent;
      userInput.value = input.join(" ");

      clearElement();
    }
  });
  userForm.addEventListener("submit", addText);
}

Init();
