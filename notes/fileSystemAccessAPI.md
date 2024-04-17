# FileSystem Access API

- We can read and write files in the real filesystem in the user's device.
- It is asynchronous.
- Requires user's permission.
- It is Chromium only at this moment. For Safari it has an extension - Origin Private FileSystem.
- It doesn't count for the Quota.


|                                                             | Open a file                                    |
|-------------------------------------------------------------|------------------------------------------------|
| ```const [ handle ] = await window.showOpenFilePicker();``` | Have the user select a file                    |
| ```const file = await handle.getFile();```                  | Get the File object from the handle            |
| ```const content = await file.text();```  (no JSON. Just .text() and then parse it) | Get the File content   | 
  Also available:  
  - ```slice();```      
  - ```stream();```    
  - ```arrayBuffer();```                               



|                                                       | Writing to an opened File                         |
|-------------------------------------------------------|---------------------------------------------------|
| ```const writable = await handlecreateWritable();```        | Make a writable stream from the handle            |
| ```await writable.write(contents);```                       | Write the contents of the file to the stream      |
| ```await writable.close();```                               | Close the file and write the contents to the disk |



| Writing to a New File                         |
|-----------------------------------------------|
 ```js
  const handle = await window.showSadeFilePicker({
      types: [{
          description: 'Test files",
          accept: {
              'text/plain': ['.txt'],
          },
      }]
  })

  const writable = await handle.createWritable();
  await writable.write(contents);
  await writable.close(); 
  ``` 