// To wait for a function with async in a Promise, you can use the await keyword. Here is an example:
export async function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  });
}
