$(".work-item-click").on("click", function () {
  let img = $(this).find('img').attr("data-src");
  let title = $(this).find('.title').text()
  let desc = $(this).find('.desc').text()
  let link = $(this).attr("attr-link-href");
  //console.log(img)
  $('#work_detail_popup img').attr('src', img)
  $('#work_detail_popup img').attr('alt', img)
  $('#word-detail-popup img').attr('data-src', img)
  $('#popup-item-title').text(title)
  $('#popup-item-desc').text(desc)
  $('#popup-item-a').attr('href', link)
  $('#popup-item-a').text(`Visit ${title}`)
});
