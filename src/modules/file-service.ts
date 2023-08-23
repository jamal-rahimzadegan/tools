class FileService {
  read(file: Blob, cb: (result: unknown) => void) {
    try {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        cb(reader.result);
        return reader.result;
      };
    } catch (err) {
      console.error('err in reading file', err);
    }
  }

  async download(url: string, fileName: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      link.remove();

      setTimeout(() => window.URL.revokeObjectURL(link.href), 100);
    } catch (err) {
      console.error(`Error in downloading the ${fileName}`, err);
    }
  }
}

export const fileService = new FileService();
