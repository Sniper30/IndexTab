
document.addEventListener('DOMContentLoaded',async()=>{
  let button_left = document.getElementById('button_to_see_the_tabs_left');//getting left btn
  let button_right = document.getElementById('button_to_see_the_tabs_right');//getting right btn
  let ul_tabs = document.getElementById('tabs')//getting ul to put li inside;
  let current_tabs = await seeTabs()//getting all current window tabs;

  var angle = -180 * Math.PI / 360;
  var step = 2 * Math.PI / current_tabs.length; 
  let radius = 150;
  current_tabs.forEach(tab => {
    let cos = (a)=> 130 + radius * Math.cos(a);
    let sin = (a)=> 130 + radius * Math.sin(a);
    
    let li = document.createElement('li');
    let img = document.createElement('img');
    let span = document.createElement('span');
    span.textContent = tab.title;
    img.src = tab.favIconUrl;
    img.onload = ()=> li.appendChild(img);
    
    img.onerror = ()=> img.src = "./broken_image_FILL0_wght400_GRAD0_opsz24.png"
    li.appendChild(span);
    Object.assign(li.style,{top:cos(angle),left:sin(angle)})
    li.classList.add('btn',tab.id);
    li.onclick = ()=> seeTab(tab.id)
    ul_tabs.appendChild(li);
    angle = angle + step;
  });//foreach to create li: {span,img}

  let rotate = 0
  function rotate_li(r){
    let all_lis = Array.from(document.querySelectorAll('li'));
    all_lis.forEach(li => li.style.transform = `rotate(${r}deg)`);
  }
  button_left.onclick =()=> {
    rotate -= 15
    ul_tabs.style.transform = `translate(0px,-120px) rotate(${rotate}deg)`;
    rotate_li(rotate * -1)
  }
  button_right.onclick =()=>{
    rotate += 15
    ul_tabs.style.transform = `translate(0px,-120px) rotate(${rotate}deg)`
    rotate_li(rotate * -1)
  }
})

function seeTab(tabID){
  console.log(tabID);
  chrome.tabs.update(tabID,{active:true})
}

const seeTabs = async ()=> {
  const current = await chrome.windows.getCurrent();
  const tabs = await chrome.tabs.query({windowId: current.id});
  return tabs
}

async function getCurrentTab() {
  let queryOptions = { active: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}