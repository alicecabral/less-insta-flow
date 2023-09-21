// const form = document.querySelector('form');
// const input = document.querySelector('input');
const button = document.querySelector('button');

const hideAndShow = () => {
    const stories = document.querySelector('._aac4');
    const notificationBar = document.querySelector('.x1iyjqo2');
    
    stories.style.transition = "opacity 0.4s ease-in-out";
    notificationBar.style.transition = "opacity 0.4s ease-in-out";
    
    // esconder stories e barra de notificações
    if(notificationBar.style.opacity === "0" || notificationBar.style.opacity === "" || stories.style.opacity === "0" || stories.style.opacity === "") {
        notificationBar.style.opacity = '1';
        stories.style.opacity = '1';
        setTimeout(function() {
            notificationBar.style.display = 'block';
            stories.style.display = 'block';
        }, 300);
    } else {
        notificationBar.style.opacity = '0';
        stories.style.opacity = '0';
        setTimeout(function() {
            notificationBar.style.display = 'none';
            stories.style.display = 'none';
        }, 300); 
    }

    // esconder botão de "New Posts"
    // if(document.querySelector('._any9')) document.querySelector('._any9').style.display = 'none';

    // // posts
    // const posts = document.querySelectorAll('article');
    // console.log(posts.length);

    // if(posts.length >= 10){
    //     alert("jsnd");
    // }
}

button.addEventListener('click', async (event) => {
    // evita recarregar a página
    event.preventDefault();

    // muda na janela da extensão
    // document.body.style.background = 'red';

    // executa uma query para buscar a janela ativa no navegador do usuário
    // salva a primeira posição do array na const tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); 

    chrome.scripting.executeScript({
        // alvo que quer executar o script
        target: { tabId: tab.id },
        // função que vai executar na aba
        function: hideAndShow, 
        // parâmetro passado para a função hideAndShow
        // args: [stories]
    });

})