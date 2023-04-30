const Trie = require("./trie");

test("Check for 'c'", () => {
  let trie = new Trie();
  trie.insert("car");
  trie.insert("carpet");
  trie.insert("java");
  trie.insert("javascript");
  trie.insert("internet");
  const result = trie.autoComplete("c");

  expect(result).toContain("car", "carpent");
});
test("Check for 'carp'", () => {
  let trie = new Trie();
  trie.insert("car");
  trie.insert("carpet");
  trie.insert("java");
  trie.insert("javascript");
  trie.insert("internet");
  const result = trie.autoComplete("carp");

  expect(result).toContain("carpet");
});

test("Check for 'jav'", () => {
  let trie = new Trie();
  trie.insert("car");
  trie.insert("carpet");
  trie.insert("java");
  trie.insert("javascript");
  trie.insert("internet");
  const result = trie.autoComplete("jav");

  expect(result).toContain("java", "javascript");
});

test("Check for 'int'", () => {
  let trie = new Trie();
  trie.insert("car");
  trie.insert("carpet");
  trie.insert("java");
  trie.insert("javascript");
  trie.insert("internet");
  const result = trie.autoComplete("int");

  expect(result).toContain("internet");
});
