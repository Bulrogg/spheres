
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var configuration = localStorage['spheres-configuration'] ? JSON.parse(localStorage['spheres-configuration']) : [['1']];

var addSphereToPosition = function (scene, material, x, y, z) {
  var sphere = BABYLON.Mesh.CreateSphere("s1", 16, 1, scene);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
  sphere.material = material;
};

var createScene = function () {
  var scene = new BABYLON.Scene(engine);

  // Setup camera
  var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
  camera.setPosition(new BABYLON.Vector3(20, 5, 5));
  camera.attachControl(canvas, true);

  // Lights
  var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
  var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);
  var light2 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(10, 0, 0), scene);
  var light3 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(1, -1, 0), scene);

  // Creating light sphere
  var lightSphere0 = BABYLON.Mesh.CreateSphere("Sphere0", 1, 0.05, scene);
  var lightSphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 1, 0.05, scene);
  var lightSphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 1, 0.05, scene);

  lightSphere0.material = new BABYLON.StandardMaterial("red", scene);
  lightSphere0.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  lightSphere0.material.specularColor = new BABYLON.Color3(0, 0, 0);
  lightSphere0.material.emissiveColor = new BABYLON.Color3(1, 0, 0);

  lightSphere1.material = new BABYLON.StandardMaterial("green", scene);
  lightSphere1.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  lightSphere1.material.specularColor = new BABYLON.Color3(0, 0, 0);
  lightSphere1.material.emissiveColor = new BABYLON.Color3(0, 1, 0);

  lightSphere2.material = new BABYLON.StandardMaterial("blue", scene);
  lightSphere2.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
  lightSphere2.material.specularColor = new BABYLON.Color3(0, 0, 0);
  lightSphere2.material.emissiveColor = new BABYLON.Color3(0, 0, 1);

  // Sphere material
  var material = new BABYLON.StandardMaterial("kosh", scene);
  material.diffuseColor = new BABYLON.Color3(1, 1, 1);

  // Sphere
  configuration.forEach(function (colonnesDeLaLigne, indexDeLaLigne, ligne) {
    var nbLigne = ligne.length;
    colonnesDeLaLigne.forEach(function (cellulesDeLaLigne, indexDeLaColonne, colonne) {
      var nbColonne = colonne.length;
      if (cellulesDeLaLigne === "1") {
        addSphereToPosition(scene, material, 0, nbLigne / 2 - indexDeLaLigne, indexDeLaColonne - nbColonne / 2);
      }
    });
  });

  // Lights colors
  light0.diffuse = new BABYLON.Color3(1, 0, 0);
  light0.specular = new BABYLON.Color3(1, 0, 0);

  light1.diffuse = new BABYLON.Color3(0, 1, 0);
  light1.specular = new BABYLON.Color3(0, 1, 0);

  light2.diffuse = new BABYLON.Color3(0, 0, 1);
  light2.specular = new BABYLON.Color3(0, 0, 1);

  light3.diffuse = new BABYLON.Color3(1, 1, 1);
  light3.specular = new BABYLON.Color3(1, 1, 1);

  // Animations
  var alpha = 0;
  scene.beforeRender = function () {
    light0.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, 25 * Math.cos(alpha));
    light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -25 * Math.cos(alpha));
    light2.position = new BABYLON.Vector3(10 * Math.cos(alpha), 0, 25 * Math.sin(alpha));

    lightSphere0.position = light0.position;
    lightSphere1.position = light1.position;
    lightSphere2.position = light2.position;

    alpha += 0.01;
  };

  // Skybox
  var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
  var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("/images/textures/TropicalSunnyDay", scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
  skybox.material = skyboxMaterial;

  return scene;
}


var scene = createScene();

engine.runRenderLoop(function () {
  scene.render();
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
