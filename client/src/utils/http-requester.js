const URL = "http://localhost:3200";

const getObjects = async (setObjects) => {
  fetch(URL, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setObjects(data);
        });
      } else {
        throw new Error(
          "Erro ao obter objetos do servidor. Status " + response.status
        );
      }
    })
    .catch((error) => {
      throw new Error("Erro ao obter objetos do servidor.\n" + error);
    });
};

export default getObjects;
