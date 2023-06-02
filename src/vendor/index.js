import html2canvas from 'html2canvas'
 
/*
* element  导出的元素
* filename 文件名
* ext      扩展文件名
*/
export function ExportImg(element, filename, ext) {
  html2canvas(element, {
    useCORS: true
  }).then((canvas) => {
    if (navigator.msSaveBlob) {
      const blob = canvas.msToBlob() // IE10+
      return navigator.msSaveBlob(blob, name)
    } else {
      const imageurl = canvas.toDataURL('image/png')
      const aLink = document.createElement('a') // 创建a标签
      aLink.style.display = 'none'
      aLink.href = imageurl
      aLink.download = `${filename}.${ext}` // 下载文件名
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink) // 用完后移除元素
    }
  })
}
