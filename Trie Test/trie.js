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

module.exports = Trie;
