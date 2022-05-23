export const fileSizeChecker = (
  maxFileSize: number, //in mbs
  file: File
): { maxFileSize: number; fileOk: boolean } => {
  const MiB = 1048576;

  const maxFileSizeInBytes = maxFileSize * MiB;
  if (file?.size > maxFileSizeInBytes) {
    return {
      maxFileSize,
      fileOk: false,
    };
  }

  return {
    maxFileSize,
    fileOk: true,
  };
};
