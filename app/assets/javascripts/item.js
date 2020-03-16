$(function(){
  // 使用する変数
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  // 画像の複数投稿
  $('#image-box').on('change', '.js-file', function(e) {
    const file = e.target.files[0];
    const url = window.URL.createObjectURL(file);
    $('#previews').append(buildFileField(fileIndex[0], url));
    fileIndex.shift();
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
    $('.isTmpArea').remove();
  });

  // 投稿予定画像の削除
  $(document).on('click', '.js-remove', function(){
    $(this).parent().remove();
  })

  // 画像のプレビュー表示
  const buildFileField = (index, url)=> { 
    tmp = Math.floor(parseInt(index)/5)
    const sizeIndex = index - tmp*5;
    const html = `<div data-index="${index}" class="js-file_group">
                    <div>
                      <img data-index="${index}"
                      class="secondBoxFileSelect"
                      src="${url}"
                      width="120px" height="120px"
                      style="margin-right: 10px;">
                    </div>
                    <div class='js-remove'>
                      delete
                    </div>
                  </div>
                  <label class="label${index}" style="width: calc(100% - ${sizeIndex}*130px);">
                    <p class="boxFileSelect" id="item_images_attributes_${index}_image_url">
                      <i class="fa fa-camera">
                        <input class="js-file input-default" type="file"
                        name="item[images_attributes][${index}][image_url]"
                        >
                      </i>
                    </p>
                  </label>
                  `;
              
    $(document).on('change', `#item_images_attributes_${index}_image_url`, function(){
      $(`#item_images_attributes_${index}_image_url`).css('display','none')
    })
    $(document).on('change', `.label${index}`, function(){
      $(`.label${index}`).css('display','none')
    })
    return html;
  }
}); 