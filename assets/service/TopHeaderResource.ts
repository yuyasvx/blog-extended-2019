class TopHeaderResource {
  /**
   * サムネイルを取得
   * @param permalink /から始まるパーマリンク
   * @param thumb cover.pngではなくcover-thumb.pngにするか
   * @returns /images/yyyy-mm/slug/cover.png
   */
  public getThumbnailLocation(permalink: string, thumb: boolean = false): string {
    const pathElement = permalink.split('/')
    const fileName = thumb ? 'cover-thumb.png' : 'cover.png' // TODO magic number
    return `/images/${pathElement[2]}-${pathElement[3]}-${pathElement[4]}/${fileName}`
  }
}

export default new TopHeaderResource()
