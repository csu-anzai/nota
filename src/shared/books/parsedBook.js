import text from './eng-web.usfx';

const removeNewLines = str => str.replace(/(\r\n|\n|\r)/gm,"");

const formatBookNameForId = (name) => {
  const firstLetter = name.charAt(0).toLowerCase();

  const nonSpacedName = name.substr(1).replace(/\s/g, '');

  return `${firstLetter}${nonSpacedName}`;
}

const getParsedBook = (book, index) => {
  const bookJson = {};

  const tocs = book.querySelectorAll('toc');

  bookJson.longName = removeNewLines(tocs[0].textContent);
  bookJson.name = removeNewLines(tocs[1].textContent);
  bookJson.shortName = removeNewLines(tocs[2].textContent);

  const chapters = {};
  let workingChapterJson = {};
  let workingBlock = [];
  let workingVerse = [];

  book.childNodes.forEach((child) => {
    if (child.tagName === 'c') {
      if (workingChapterJson.id) {
        if (workingVerse.length > 0) {
          workingBlock.push(workingVerse);
          workingVerse = [];
        }
        if (workingBlock.length > 0) {
          workingChapterJson.blocks.push(workingBlock);

          workingBlock = [];
        }

        chapters[workingChapterJson.id] = workingChapterJson;
      }

      workingChapterJson = { id: child.getAttribute('id'), blocks: [] };
      return;
    }

    if (!workingChapterJson.id) return;

    if (child.tagName === 'p') {
      if (workingBlock.length > 0) {
        if (workingVerse.length > 0) {
          workingBlock.push(workingVerse);

          workingVerse = [];
        }

        workingChapterJson.blocks.push(workingBlock);
      }

      workingBlock = [];

      child.childNodes.forEach((line) => {
        // TODO: handle footnote references
        if (line.tagName === 'f') return;
        if (line.tagName === 'x') return;
        
        if (line.tagName === 'v') {
          if (workingVerse.length > 0) {
            workingBlock.push(workingVerse);
          }

          workingVerse = [];
        } else {
          const text = removeNewLines(line.textContent);

          if (text !== "") workingVerse.push({ text });
        }
      });
    }

    if (child.tagName === 'q') {
      if (child.childElementCount > 0) {
        child.childNodes.forEach((line) => {
          // TODO: handle footnote references
          if (line.tagName === 'f' || line.tagName === 'x') {

          } else if (line.tagName === 'v') {
            if (workingVerse.length > 0) {
              workingBlock.push(workingVerse);
            }

            workingVerse = [];
          } else {
            const text = removeNewLines(line.textContent);
            // if (index === 40) console.log(child, child.tagName, text);

            if (text !== "") {
              workingVerse.push({ quote: text });
            }
          }
        });
      } else {
        const text = removeNewLines(child.textContent);
    
        if (text !== "") {
          workingVerse.push({ quote: text });
        }
      }
    }
  });

  if (workingChapterJson.id) {
    if (workingVerse.length > 0) {
      workingBlock.push(workingVerse);
      workingVerse = [];
    }
    if (workingBlock.length > 0) {
      workingChapterJson.blocks.push(workingBlock);

      workingBlock = [];
    }

    chapters[workingChapterJson.id] = workingChapterJson;
  }

  bookJson.chapters = chapters;

  return bookJson;
};


const parseBible = () => {
  const parser = new DOMParser().parseFromString(text, 'text/xml');

  const books = parser.querySelectorAll('book');

  const bibleJson = {};

  books.forEach((book, index) => {
    const bookJson = getParsedBook(book, index);
    bibleJson[formatBookNameForId(bookJson.name)] = bookJson;
  });

  window.jude = books[63];

  return bibleJson;
};

export default parseBible();
