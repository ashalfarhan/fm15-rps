export const sleep = async (dur: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, dur);
  });
