(() => {
  const $ = (selector,root=document) => root.querySelector(selector);
  const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
  const pad = n => String(n).padStart(2,'0');
  const viewer = $('#image-dialog');
  const index = $('#index-dialog');
  let lastTrigger = null;
  let boardIndex = null;
  let content;

  function resetZoom() {
    $('#viewer-scroll').classList.remove('zoomed');
    $('#viewer-zoom').textContent = 'Zoom in +';
    $('#viewer-zoom').setAttribute('aria-pressed','false');
    $('#viewer-scroll').scrollTop = 0;
    $('#viewer-scroll').scrollLeft = 0;
  }
  function displayBoard(n) {
    boardIndex = n;
    const title = content.boards[n-1];
    $('#viewer-image').src = `assets/board-${pad(n)}.jpg`;
    $('#viewer-image').alt = `${pad(n)} — ${title}, original presentation board`;
    $('#image-caption').textContent = `${pad(n)} / ${title}`;
    $('#viewer-count').textContent = `${pad(n)} / ${pad(content.boards.length)}`;
    $('#viewer-prev').disabled = n === 1;
    $('#viewer-next').disabled = n === content.boards.length;
    $('#viewer-prev').hidden = false;
    $('#viewer-next').hidden = false;
    resetZoom();
  }
  document.addEventListener('click',e=>{
    const trigger = e.target.closest('[data-board],[data-image]');
    if(!trigger || !content) return;
    lastTrigger = trigger;
    if(trigger.dataset.board) displayBoard(Number(trigger.dataset.board));
    else {
      boardIndex = null;
      $('#viewer-image').src = trigger.dataset.image;
      $('#viewer-image').alt = trigger.dataset.caption || 'Detail from the design process';
      $('#image-caption').textContent = trigger.dataset.caption || '';
      $('#viewer-count').textContent = 'DETAIL FROM THE ORIGINAL BOARD';
      $('#viewer-prev').hidden = true;
      $('#viewer-next').hidden = true;
      resetZoom();
    }
    viewer.showModal();
    $('#viewer-close').focus();
  });
  $('#viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{resetZoom();lastTrigger?.focus({preventScroll:true});});
  viewer.addEventListener('click',e=>{if(e.target===viewer) viewer.close();});
  $('#viewer-zoom').addEventListener('click',()=>{
    const zoomed=$('#viewer-scroll').classList.toggle('zoomed');
    $('#viewer-zoom').textContent=zoomed?'Fit −':'Zoom in +';
    $('#viewer-zoom').setAttribute('aria-pressed',String(zoomed));
  });
  $('#viewer-prev').addEventListener('click',()=>{if(boardIndex>1)displayBoard(boardIndex-1);});
  $('#viewer-next').addEventListener('click',()=>{if(boardIndex<content.boards.length)displayBoard(boardIndex+1);});
  viewer.addEventListener('keydown',e=>{
    if(!boardIndex || !['ArrowLeft','ArrowRight'].includes(e.key) || $('#viewer-scroll').classList.contains('zoomed'))return;
    e.preventDefault();
    const next=boardIndex+(e.key==='ArrowRight'?1:-1);
    if(next>=1&&next<=content.boards.length)displayBoard(next);
  });
  $('#open-index').addEventListener('click',()=>index.showModal());
  $('#close-index').addEventListener('click',()=>index.close());
  $$('#index-dialog a').forEach(a=>a.addEventListener('click',()=>index.close()));
  index.addEventListener('click',e=>{if(e.target===index)index.close();});

  function initializeTabs(attribute,onChange) {
    const tabs=$$(`[${attribute}]`);
    if(!tabs.length)return;
    function select(i,focus=false) {
      tabs.forEach((tab,j)=>{
        tab.setAttribute('aria-selected',String(j===i));
        tab.tabIndex=j===i?0:-1;
        const panel=document.getElementById(tab.getAttribute('aria-controls'));
        if(panel)panel.hidden=j!==i;
      });
      if(focus)tabs[i].focus({preventScroll:true});
      if(onChange)onChange(i);
    }
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>select(i));
      tab.addEventListener('keydown',e=>{
        const vertical=tab.closest('[role=tablist]').getAttribute('aria-orientation')==='vertical';
        const nextKey=vertical?'ArrowDown':'ArrowRight';
        const prevKey=vertical?'ArrowUp':'ArrowLeft';
        let target;
        if(e.key===nextKey) target=(i+1)%tabs.length;
        else if(e.key===prevKey)target=(i+tabs.length-1)%tabs.length;
        else if(e.key==='Home')target=0;
        else if(e.key==='End')target=tabs.length-1;
        else return;
        e.preventDefault();select(target,true);
      });
    });
  }
  initializeTabs('data-layer');
  initializeTabs('data-form');
  const mobileAppLayout = window.matchMedia('(max-width: 760px)');
  function syncAppOrientation() {
    const tabs = $('.app-steps');
    if (tabs) tabs.setAttribute('aria-orientation',mobileAppLayout.matches?'horizontal':'vertical');
  }
  syncAppOrientation();
  mobileAppLayout.addEventListener('change',syncAppOrientation);

  let ticking=false;
  const chapters=$$('.chapter');
  function updateReading() {
    const total=document.documentElement.scrollHeight-window.innerHeight;
    const progress=total>0?Math.min(100,Math.max(0,window.scrollY/total*100)):0;
    $('#reading-progress').style.width=`${progress}%`;
    let current=null;
    for(const chapter of chapters){if(chapter.getBoundingClientRect().top<=150)current=chapter.id;}
    $$('.chapter-nav a').forEach(link=>{
      if(link.hash===`#${current}`)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    ticking=false;
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateReading);}},{passive:true});
  window.addEventListener('resize',updateReading);
  updateReading();

  fetch('content.json').then(r=>{if(!r.ok)throw new Error('Could not load content');return r.json();}).then(data=>{
    content=data;
    let scene=0;
    function selectScene(n) {
      if(n<0||n>=content.scenes.length)return;
      scene=n;
      const item=content.scenes[n];
      $('#scene-image').src=`assets/scenario-${n+1}.jpg`;
      $('#scene-image').alt=`Step ${n+1} — ${item.title}, original usage scenario`;
      $('#scene-count').textContent=`${pad(n+1)} / ${pad(content.scenes.length)}`;
      $('#scene-verb').textContent=item.verb;
      $('#scene-title').textContent=item.title;
      $('#scene-description').textContent=item.description;
      $('#scene-prev').disabled=n===0;
      $('#scene-next').disabled=n===content.scenes.length-1;
      $$('[data-scene]').forEach((b,i)=>{if(i===n)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    }
    if($('#scene-next')){
      $('#scene-next').addEventListener('click',()=>selectScene(scene+1));
      $('#scene-prev').addEventListener('click',()=>selectScene(scene-1));
      $$('[data-scene]').forEach(b=>b.addEventListener('click',()=>selectScene(Number(b.dataset.scene))));
    }
    initializeTabs('data-app',n=>{
      $('#app-image').src=`assets/app-${n+1}.jpg`;
      $('#app-image').alt=`${content.appScreens[n].label} — original app screen`;
    });
    $$('[data-part]').forEach(button=>button.addEventListener('click',()=>{
      const n=Number(button.dataset.part);
      const part=content.parts[n];
      $$('[data-part]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.part)===n)));
      $('#part-english').textContent=part.english;
      $('#part-title').textContent=part.title;
      $('#part-description').textContent=part.description;
    }));
  }).catch(error=>{
    console.error(error);
    // The full narrative and original previews remain readable without enhancement.
    $$('[data-board],[data-image]').forEach(button=>{
      const n=button.dataset.board;
      const a=document.createElement('a');
      a.href=n?`assets/board-${pad(n)}.jpg`:button.dataset.image;
      a.className=button.className;
      a.innerHTML=button.innerHTML;
      a.setAttribute('aria-label',button.getAttribute('aria-label')||button.textContent);
      button.replaceWith(a);
    });
  });
})();
