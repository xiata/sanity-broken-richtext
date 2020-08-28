# Broken Behavior

Note that this rich text structure was more or less suggested, so if I did something wrong, well, I
got bad advice. I suspect I am not the only person who structured their data in this manner through
advice and/or trial and error.

I apologize for the styles dropdown permutations. I am not a fan of this approach, and really it
should use css classes, but limitations of allocated time for a POC, inability to apply two annotations
on the same text content, and lack of key-value relationship for decorators and mutual exclusion on
the same key forced my hand. See my comment in schemas/meta/RichTextBlock.js for a wishlist change
that would let me vastly improve UX while giving Portable Text Editor serious power. Obviously it's
not considering the complications that would roll downhill into the block-content-to-react project.

Curiously, if I start with a data structure created in desk-tool 1.150.4, and revert back to 1.149.19
it shows a Freeform Text Editor component inside a Portable Text Editor, as if it was one of the
insertable types. So clearly, the structure changed somehow, and there wasn't any red flags shown
between 1.149 and 1.150. Definitely a candidate for some kind of "please migrate me!" instructions.

# Initial test with 1.149.19

1. Modify sanity.json: set your api and project keys as you would with any project.
2. You'll probably want to `git add :/` so you can `git checkout :/` if you want to be able to
revert quickly)
3. sanity install (note: I locked versions in package.json to 1.149.19)
4. sanity start
5. Create a new Foo Bar document with a few paragraphs. Also, go to baconipsum.com, generate some
text and paste it in too for good measure.
6. Notice it happily accepts pasted content.
7. Publish document.
8. Notice it's happy loading this document as you'd expect (visit Rich Text section, come back to
Foo Bar document, reload page, etc).

# Now lets break things

1. sanity upgrade
2. sanity start
3. Go to that Foo Bar document you created. Notice it has marked the content as invalid.
4. Go through the song and dance of removing multiple invalid values (wat).
5. Change the text to something valid. DO NOT PUBLISH.
6. Click on the Rich Text Content Item, then go back to your Foo Bar document.
7. Notice no error, that's ok.
8. In the dropdown next to the publish button, Discard Changes.
9. Confirm, and watch Desk crash.
10. Retry or reload the page and it's happy again, but back in the broken state at step 3.