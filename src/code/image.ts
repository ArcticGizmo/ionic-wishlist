export async function webPathToDataUrl(webUrl: string): Promise<string> {
  const resp = await fetch(webUrl);
  const blob = await resp.blob();
  return blobToDataUrl(blob);
}

export function blobToDataUrl(blob: Blob): Promise<string> {
  const reader = new FileReader();
  return new Promise(resolve => {
    reader.onload = (e: ProgressEvent<FileReader>) => {
      resolve(e?.target?.result as string);
    };
    reader.readAsDataURL(blob);
  });
}
