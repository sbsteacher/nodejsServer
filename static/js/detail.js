(function() {
    const $btn = document.querySelector('button');
    const $localConst = document.querySelector('#localConst');
    $btn.addEventListener('click', e => {
        if(confirm('삭제하시겠습니까')) {
            location.href = `delete?iboard=${$localConst.dataset.iboard}`;
        }
    });
})();