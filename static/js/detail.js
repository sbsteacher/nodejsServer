(function() {
    const $btnDel = document.querySelector('button#btn_del');
    const $btnUpd = document.querySelector('button#btn_upd');
    const $localConst = document.querySelector('#localConst');
    $btnDel.addEventListener('click', e => {
        if(confirm('삭제하시겠습니까')) {
            location.href = `delete?iboard=${$localConst.dataset.iboard}`;
        }
    });

    $btnUpd.addEventListener('click', e => {
        if(confirm('수정하시겠습니까')) {
            location.href = `update?iboard=${$localConst.dataset.iboard}`;
        }
    });
})();