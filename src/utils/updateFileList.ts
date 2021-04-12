import {UploadFile} from '../components/Upload/Upload'
const updateFileList = (fileList: UploadFile[], updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
  return fileList.map((file) => {
    if (file.uid === updateFile.uid) {
      return {...updateFile, ...updateObj}
    } else {
      return file
    }
  })
}

export default updateFileList