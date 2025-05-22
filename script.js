
const button = document.querySelector('button');

const executeCurrentTab = () => {
    const feed = document.querySelector("article").parentElement;
    let postCount = 0;
    // console.log(feed)
    
    if (feed) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.previousSibling instanceof HTMLElement && mutation.previousSibling.tagName === 'ARTICLE' && mutation.removedNodes.length == 0) {
                    // console.log(mutation);
                    postCount++; 
                    if(postCount % 10 == 0) alert("You have seen " + postCount + " posts. Do you want to continue?");
                }
            });
        });
        observer.observe(feed, { childList: true, subtree: true, attributes: true });
    } else {
        console.error('No feed found.');
    }

    // selecionar elementos
    const stories = document.querySelector('._aao_');
    const sugestions = document.querySelector('._aak3'); 
    const explore = document.querySelector("div.x1iyjqo2.xh8yej3 > div:nth-child(3)");
    // console.log("explorar " + explore)
    const messageNotifications = document.querySelector('.x13v4lgv');
    // console.log("notificacoes das msgs " + messageNotifications)
    const likes = document.querySelector("div.x1iyjqo2.xh8yej3 > div:nth-child(6)");
    // console.log("curtidas " + likes)
    let reels = document.querySelector("div.x1iyjqo2.xh8yej3 > div:nth-child(4)"); 
    // console.log("reels " + reels)

    // criar botão de mostrar stories
    let storiesShowButton = document.querySelector('#storiesShowButton');
    if (!storiesShowButton) {
        storiesShowButton = document.createElement('button');
        storiesShowButton.id = 'storiesShowButton';
        stories.insertAdjacentElement('beforebegin', storiesShowButton);
        storiesShowButton.innerHTML = '&#128065;';
        storiesShowButton.style.fontSize = '45px';
        storiesShowButton.style.justifyContent = 'center';
        storiesShowButton.style.position = 'absolute';
        storiesShowButton.style.top = '35%';
        storiesShowButton.style.left = '48%';
        storiesShowButton.style.display = 'none';
        storiesShowButton.style.background = 'transparent';
        storiesShowButton.style.border = 'none';
        storiesShowButton.style.cursor = 'pointer';
    }

    storiesShowButton.addEventListener('click', () => {
        storiesShowButton.style.display = 'none';
        stories.style.pointerEvents = 'auto'; 
        stories.style.filter = 'blur(0px)';
        stories.style.opacity = '1';
    });

    // criar botão de mostrar reels
    let reelsShowButton = document.querySelector('#reelsShowButton');
    if (!reelsShowButton) {
        reelsShowButton = document.createElement('button');
        reelsShowButton.id = 'reelsShowButton';
        reels.insertAdjacentElement('beforebegin', reelsShowButton);
        reelsShowButton.innerHTML = '&#128065;';
        reelsShowButton.style.fontSize = '22px';
        reelsShowButton.style.justifyContent = 'center';
        reelsShowButton.style.position = 'absolute';
        reelsShowButton.style.top = '31%';
        reelsShowButton.style.left = '27%';
        reelsShowButton.style.display = 'none';
        reelsShowButton.style.background = 'transparent';
        reelsShowButton.style.border = 'none';
        reelsShowButton.style.cursor = 'pointer';
    }
    
    reelsShowButton.addEventListener('click', () => {
        reelsShowButton.style.display = 'none';
        reels.style.pointerEvents = 'auto'; 
        reels.style.filter = 'blur(0px)';
        reels.style.opacity = '1';
    });
    
    // definir transição dos elementos
    explore.style.transition = "opacity 0.4s ease-in-out";
    if(messageNotifications) messageNotifications.style.transition = "opacity 0.4s ease-in-out";
    likes.style.transition = "opacity 0.4s ease-in-out";
    stories.style.transition = "opacity 0.4s ease-in-out";
    reels.style.transition = "opacity 0.4s ease-in-out";
    storiesShowButton.style.transition = "opacity 0.4s ease-in-out";
    reelsShowButton.style.transition = "opacity 0.4s ease-in-out";

    let exploreDisplay;
    // ocultar explorar, mensagens e notificações
    if(explore.style.display == "none") {
        reels.style.pointerEvents = "auto";
        stories.style.pointerEvents = "auto";
        explore.style.display = 'block';
        exploreDisplay = explore.style.display;
        if(messageNotifications) messageNotifications.style.display = 'block';
        likes.style.display = 'block';
        storiesShowButton.style.display = 'none';
        reelsShowButton.style.display = 'none';
        setTimeout(function() {
            explore.style.opacity = '1';
            if(messageNotifications) messageNotifications.style.opacity = '1';
            likes.style.opacity = '1';
            reels.style.opacity = '1';
            stories.style.opacity = '1';
            storiesShowButton.style.opacity = '0';
            reelsShowButton.style.opacity = '0';
            stories.style.filter = 'blur(0px)';
            reels.style.filter = 'blur(0px)';
        }, 50);
    } else {
        reels.style.pointerEvents = 'none';
        stories.style.pointerEvents = 'none';
        explore.style.opacity = '0';
        if(messageNotifications) messageNotifications.style.opacity = '0';
        likes.style.opacity = '0';
        reels.style.opacity = '0.2';
        stories.style.opacity = '0.2';
        stories.style.filter = 'blur(5px)';
        reels.style.filter = 'blur(1.5px)';
        storiesShowButton.style.opacity = '1';
        reelsShowButton.style.opacity = '1';
        setTimeout(function() {
            explore.style.display = 'none';
            exploreDisplay = explore.style.display;
            if(messageNotifications) messageNotifications.style.display = 'none';
            likes.style.display = 'none';
            reelsShowButton.style.display = 'block';
            storiesShowButton.style.display = 'block';
        }, 100); 
    }

    // ocultar sugestões
    if(sugestions != null){
        if(sugestions.style.display == "none") {
            sugestions.style.display = 'block';
            setTimeout(function() {
                sugestions.style.opacity = '1';
            }, 50);
        } else {
            sugestions.style.transition = "opacity 0.4s ease-in-out";
            sugestions.style.opacity = '0';
            setTimeout(function() {
                sugestions.style.display = 'none';
            }, 100); 
        }
    }
}

let clicks = 0;

// recupera o estado anterior dos cliques do armazenamento local
chrome.storage.local.get(['clicks'], function(result) {
    clicks = result.clicks || 0;
    // updateButtonText();
});

function updateButtonText() {
  if (clicks % 2 === 0) {
    button.textContent = 'Activate';
    button.disabled = false;
    button.style.opacity = "1";
    button.style.cursor = "pointer";
    button.style.paddingRight = "30px";
    button.style.paddingLeft = "30px";
  } else {
    button.textContent = 'Activated';
    // button.disabled = true;
    button.style.opacity = "0.5";
    button.style.cursor = "context-menu";
    button.style.paddingRight = "25px";
    button.style.paddingLeft = "25px";
  }
}

button.addEventListener('click', async (event) => {
    event.preventDefault();

    // atualizar contador de cliques
    clicks++;
    
    // // salva o novo estado no armazenamento local
    chrome.storage.local.set({ 'clicks': clicks });

    // executa uma query para buscar a janela ativa no navegador do usuário
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); 

    chrome.scripting.executeScript({
        // alvo que quer executar o script
        target: { tabId: tab.id },
        // função que vai executar na aba
        function: executeCurrentTab, 
        // parâmetro passado para a função
        // args: [button]
    });

    window.close();
    // updateButtonText();
})