export default (file, fileKey) => {
  let formData = new FormData();
  const parts = file.path.split("/");
  formData.append(fileKey, {
    name: file.name ? file.name : parts[parts.length - 1],
    filename: file.name ? file.name : parts[parts.length - 1],
    type: file.type ? file.type : file.mime,
    uri: file.uri ? file.uri : file.path,
  });

  return formData;
};
