# flappy-bird
A site to play flappy bird

![image](https://github.com/user-attachments/assets/aad5f804-1b84-467f-866d-9e5fed3ccba0)

## Development

Clone this repo, and then run the following to install the typescript compiler locally:

```
npm install typescript --save-dev
```

This project is using the main.ts file, which is compiled to main.js.

DO NOT make manual edits to the main.js file. It is meant to be automatically created on compilation from the typescript file.

To auto compile each time you save your changes, run the following command:

```
npx tsc -w
```

Alternatively, you can just compile each time using:

```
npx tsc
```