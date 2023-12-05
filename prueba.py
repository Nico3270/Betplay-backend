import requests
from bs4 import BeautifulSoup

def print_duel_participant(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    # Busca el div con la clase "duelParticipant"
    duel_participant = soup.find('div', class_='duelParticipant')

    if duel_participant:
        # Imprime el contenido del div "duelParticipant"
        print(duel_participant.decode_contents())
    else:
        print("No se encontró el div con la clase 'duelParticipant'")

# Reemplaza 'tu_url' con la url de la página que deseas analizar
print_duel_participant('https://www.flashscore.co/partido/8xbBQFa2/#/resumen-del-partido/estadisticas-del-partido/0')