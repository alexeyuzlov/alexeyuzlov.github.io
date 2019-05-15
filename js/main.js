var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/prefabs/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                var preloadBar = new Sample.Prefab.PreloadBar(this.game, this.game.world.width - 10, this.game.world.height - 10);
                this.load.setPreloadSprite(preloadBar);
                this.load.atlasXML('player', 'assets/images/prefabs/player/player.png', 'assets/images/prefabs/player/player.xml');
                //this.load.image('tween', 'assets/images/prefabs/tween.png');
                this.load.image('tween', 'assets/images/prefabs/transparent.png');
                //this.load.image('transparent', 'assets/images/prefabs/transparent-debug.png');
                this.load.image('transparent', 'assets/images/prefabs/transparent.png');
                this.load.image('hud', 'assets/images/prefabs/hud.png');
                this.load.image('ground', 'assets/images/ground.png');
                this.load.image('platform-h', 'assets/images/prefabs/platform-h.png');
                this.load.image('platform-v', 'assets/images/prefabs/platform-v.png');
                this.load.image('bottle-hp', 'assets/images/prefabs/bottles/bottle-hp.png');
                this.load.image('bottle-super', 'assets/images/prefabs/bottles/bottle-super.png');
                this.load.image('exit', 'assets/images/prefabs/exit.png');
                this.load.image('spike', 'assets/images/prefabs/spike.png');
                this.load.image('ice-spike', 'assets/images/prefabs/ice-spike.png');
                this.load.atlasXML('runner', 'assets/images/prefabs/enemies/runner.png', 'assets/images/prefabs/enemies/runner.xml');
                this.load.atlasXML('flier', 'assets/images/prefabs/enemies/flier.png', 'assets/images/prefabs/enemies/flier.xml');
                this.load.atlasXML('flier-crash', 'assets/images/prefabs/enemies/flier-crash.png', 'assets/images/prefabs/enemies/flier-crash.xml');
                this.load.atlasXML('shooter', 'assets/images/prefabs/enemies/shooter.png', 'assets/images/prefabs/enemies/shooter.xml');
                this.load.atlasXML('shooter-reject', 'assets/images/prefabs/enemies/shooter-reject.png', 'assets/images/prefabs/enemies/shooter-reject.xml');
                this.load.atlasXML('boss', 'assets/images/prefabs/enemies/boss.png', 'assets/images/prefabs/enemies/boss.xml');
                this.load.atlasXML('egg', 'assets/images/prefabs/bullets/egg.png', 'assets/images/prefabs/bullets/egg.xml');
                this.load.image('bullet', 'assets/images/prefabs/bullets/bullet.png');
                this.load.image('bullet-reject', 'assets/images/prefabs/bullets/bullet-reject.png');
            };
            Preload.prototype.create = function () {
                this.game.state.start(Sample.settings.storage.getCurrentState());
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var AbstractStory = (function (_super) {
            __extends(AbstractStory, _super);
            function AbstractStory() {
                _super.apply(this, arguments);
                this.index = 0;
                this.line = '';
            }
            AbstractStory.prototype.preload = function () {
            };
            AbstractStory.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';
                this.text = this.game.add.text(10, 10, '', Sample.settings.font.whiteBig);
                this.text.wordWrap = true;
                this.text.wordWrapWidth = this.game.width;
                this.nextLine();
            };
            AbstractStory.prototype.nextLine = function () {
                this.index++;
                if (this.index < this.content.length) {
                    this.line = '';
                    this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
                }
                else {
                    this.game.state.start(this.nextLevel);
                }
            };
            AbstractStory.prototype.updateLine = function () {
                if (this.line.length < this.content[this.index].length) {
                    this.line = this.content[this.index].substr(0, this.line.length + 1);
                    this.text.setText(this.line);
                }
                else {
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
                }
            };
            return AbstractStory;
        })(Phaser.State);
        State.AbstractStory = AbstractStory;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Story1 = (function (_super) {
            __extends(Story1, _super);
            function Story1() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[Sample.Levels.Zone1Level1];
                this.content = [
                    '',
                    'Ты спишь. Видишь, как миры, будто картины, сменяют друг друга.',
                    'На одной изображен летний день, на другой - кромешная ночь.',
                    'Их объединяет одно: чувство ужаса и страха смерти главного героя, исходящие от картины!',
                    'Ты просыпаешься. И, вместо привычных желаний, ты испытываешь дежавю...'
                ];
            }
            Story1.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };
            Story1.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Story1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story1;
        })(State.AbstractStory);
        State.Story1 = Story1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Story2 = (function (_super) {
            __extends(Story2, _super);
            function Story2() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[Sample.Levels.Zone2Level1];
                this.content = [
                    '',
                    'Все как во сне: ты увидел луг и боролся за жизнь.',
                    'Ты шел долго и, найдя укромное место, прилег.',
                    'Над головой сгущались тучи, солнце уходило за горизонт.',
                    'Стало совсем темно, но тебе поможет твое дежавю...'
                ];
            }
            Story2.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };
            Story2.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Story2.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story2;
        })(State.AbstractStory);
        State.Story2 = Story2;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Story3 = (function (_super) {
            __extends(Story3, _super);
            function Story3() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[Sample.Levels.Zone3Level1];
                this.content = [
                    '',
                    'Целую ночь ты шел по холмам, усыпанными камнями.',
                    'Когда забрезжил утренний свет, ты увидел, что тропинка поднимается в гору.',
                    'Один из путников одолжил тебе коньки: «На твоём пути встретится немало горных озер!»',
                ];
            }
            Story3.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };
            Story3.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Story3.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story3;
        })(State.AbstractStory);
        State.Story3 = Story3;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Story4 = (function (_super) {
            __extends(Story4, _super);
            function Story4() {
                _super.apply(this, arguments);
                this.nextLevel = Sample.Levels[Sample.Levels.Zone4Level1];
                this.content = [
                    '',
                    'Поднявшись на вершину горы, ты оказался перед замком.',
                    'Страх неизвестности охватил тебя.',
                    '«Вспоминая сон, только так я смогу, наконец, выбраться отсюда!» - собрав все мужество, ты двинулся вперед...'
                ];
            }
            Story4.prototype.preload = function () {
                _super.prototype.preload.call(this);
            };
            Story4.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Story4.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Story4;
        })(State.AbstractStory);
        State.Story4 = Story4;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var AbstractZone = (function (_super) {
            __extends(AbstractZone, _super);
            function AbstractZone() {
                _super.apply(this, arguments);
            }
            AbstractZone.prototype.preload = function () {
                // All in preload file
                // Don't delete this function
            };
            AbstractZone.prototype.create = function () {
                var _this = this;
                Sample.settings.storage.setCurrentState(this.game.state.current);
                this.game.stage.backgroundColor = "#000000";
                // MAP AND LAYERS
                this.map = this.game.add.tilemap('map');
                this.map.addTilesetImage('ground');
                this.map.setCollisionBetween(1, 5);
                this.layer = this.map.createLayer('layer');
                this.layer.resizeWorld();
                // PREFABS SINGLE
                this.player = new Sample.Prefab.Player(this.game, 120, this.game.world.height - 200);
                this.hud = new Sample.Prefab.HUD(this.game, 10, 10);
                this.hud.alpha = 0;
                // PREFABS MULTIPLE
                this.transparents = this.getPrefabsFromMap('transparent', Sample.Prefab.Transparent);
                this.exits = this.getPrefabsFromMap('exit', Sample.Prefab.Exit);
                this.spikes = this.getPrefabsFromMap('spike', Sample.Prefab.Spike);
                this.iceSpikes = this.getPrefabsFromMap('ice-spike', Sample.Prefab.IceSpike);
                this.bottlesHP = this.getPrefabsFromMap('bottle-hp', Sample.Prefab.BottleHP);
                this.bottlesSuper = this.getPrefabsFromMap('bottle-super', Sample.Prefab.BottleSuper);
                this.shooters = this.getPrefabsFromMap('shooter', Sample.Prefab.Shooter);
                this.shootersReject = this.getPrefabsFromMap('shooter-reject', Sample.Prefab.ShooterReject);
                this.runners = this.getPrefabsFromMap('runner', Sample.Prefab.Runner);
                this.fliers = this.getPrefabsFromMap('flier', Sample.Prefab.Flier);
                this.fliersCrash = this.getPrefabsFromMap('flier-crash', Sample.Prefab.FlierCrash);
                this.platformsHorizontal = this.getPrefabsFromMap('platform-h', Sample.Prefab.PlatformHorizontal);
                this.platformsVertical = this.getPrefabsFromMap('platform-v', Sample.Prefab.PlatformVertical);
                // POST-SETTINGS
                this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);
                this.blackScreen = new Sample.Prefab.BlackScreen(this.game);
                this.blackScreen.setText(this.game.state.current);
                this.game.add.tween(this.blackScreen)
                    .to({ alpha: 0 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function () {
                    _this.hud.alpha = 1;
                });
                this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(function () {
                    _this.game.paused = !_this.game.paused;
                });
            };
            AbstractZone.prototype.getPrefabsFromMap = function (name, className) {
                var group = this.game.add.group();
                var index = this.map.getTilesetIndex(name);
                if (className && index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, name, 0, true, false, group, className);
                }
                else if (index) {
                    this.map.createFromObjects('objects', this.map.tilesets[index].firstgid, name, 0, true, false, group);
                }
                return group;
            };
            AbstractZone.prototype.render = function () {
                //this.game.debug.spriteInfo(this.player, 100, 100);
            };
            AbstractZone.prototype.update = function () {
                /*
                DEBUG FEATURE
    
                 if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                     this.blackScreen.setText("");
                     this.game.add.tween(this.blackScreen)
                        .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                        .onComplete.add(()=> {
                            this.startNextLevel();
                        });
                 }
    
                */
            };
            AbstractZone.prototype.gameOver = function () {
                var _this = this;
                this.blackScreen.setText("Game Over. Reload Level.");
                this.game.add.tween(this.blackScreen)
                    .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                    .onComplete.add(function () {
                    _this.game.state.start(_this.game.state.current);
                });
            };
            AbstractZone.prototype.startNextLevel = function () {
                Sample.settings.storage.setHealthPoints(this.player.health.toString());
                this.game.state.start(this.getNextLevel());
            };
            AbstractZone.prototype.getNextLevel = function () {
                switch (this.game.state.current) {
                    case Sample.Levels[Sample.Levels.Zone1Level1]:
                        //return Levels[Levels.Zone2Level1];
                        return Sample.Stories[Sample.Stories.Story2];
                        break;
                    case Sample.Levels[Sample.Levels.Zone2Level1]:
                        //return Levels[Levels.Zone3Level1];
                        return Sample.Stories[Sample.Stories.Story3];
                        break;
                    case Sample.Levels[Sample.Levels.Zone3Level1]:
                        //return Levels[Levels.Zone4Level1];
                        return Sample.Stories[Sample.Stories.Story4];
                        break;
                    case Sample.Levels[Sample.Levels.Zone4Level1]:
                        return 'gameOver';
                        break;
                }
            };
            return AbstractZone;
        })(Phaser.State);
        State.AbstractZone = AbstractZone;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone1 = (function (_super) {
            __extends(Zone1, _super);
            function Zone1() {
                _super.apply(this, arguments);
            }
            Zone1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.image('bg', 'assets/images/zone1.png');
                this.game.load.spritesheet('rain', 'assets/images/rain.png', 8, 8);
            };
            Zone1.prototype.create = function () {
                this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
                this.bg.fixedToCamera = true;
                _super.prototype.create.call(this);
                this.game.stage.backgroundColor = "#D7F5FF";
                this.rainCreate();
            };
            Zone1.prototype.update = function () {
                _super.prototype.update.call(this);
                this.bg.tilePosition.x -= 2;
            };
            Zone1.prototype.rainCreate = function () {
                var emitter = this.game.add.emitter(this.game.world.centerX, -this.game.world.centerY, 2000);
                emitter.width = this.game.world.width + this.game.world.width * 0.2;
                emitter.angle = 20;
                emitter.makeParticles('rain');
                emitter.minParticleScale = 0.2;
                emitter.maxParticleScale = 0.7;
                emitter.setYSpeed(100, 700);
                emitter.setXSpeed(-5, 5);
                emitter.minRotation = 0;
                emitter.maxRotation = 0;
                emitter.start(false, 10000, 5, 0);
            };
            return Zone1;
        })(State.AbstractZone);
        State.Zone1 = Zone1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone1Level1 = (function (_super) {
            __extends(Zone1Level1, _super);
            function Zone1Level1() {
                _super.apply(this, arguments);
            }
            Zone1Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/1-1.json', null, Phaser.Tilemap.TILED_JSON);
            };
            Zone1Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Zone1Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone1Level1;
        })(State.Zone1);
        State.Zone1Level1 = Zone1Level1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone2 = (function (_super) {
            __extends(Zone2, _super);
            function Zone2() {
                _super.apply(this, arguments);
                this.lightRadius = 150;
            }
            Zone2.prototype.preload = function () {
                this.game.load.image('bg', 'assets/images/zone2.png');
                _super.prototype.preload.call(this);
            };
            Zone2.prototype.create = function () {
                this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
                this.bg.fixedToCamera = true;
                _super.prototype.create.call(this);
                this.game.stage.backgroundColor = "#330169";
                this.shadowTexture = this.game.add.bitmapData(this.map.widthInPixels, this.map.heightInPixels);
                this.lightSprite = this.game.add.image(0, 0, this.shadowTexture);
                this.lightSprite.blendMode = PIXI.blendModes.MULTIPLY;
            };
            Zone2.prototype.update = function () {
                _super.prototype.update.call(this);
                this.shadowUpdate();
                this.hud.bringToTop();
                this.bg.tilePosition.x = -this.player.x / 5;
            };
            Zone2.prototype.shadowUpdate = function () {
                this.shadowTexture.context.fillStyle = '#222222';
                this.shadowTexture.context.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);
                var gradient = this.shadowTexture.context.createRadialGradient(this.player.body.x, this.player.body.y, this.lightRadius * 0.75, this.player.body.x, this.player.body.y, this.lightRadius);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
                this.shadowTexture.context.beginPath();
                this.shadowTexture.context.fillStyle = gradient;
                this.shadowTexture.context.arc(this.player.body.x, this.player.body.y, this.lightRadius, 0, Math.PI * 2);
                this.shadowTexture.context.fill();
                this.shadowTexture.dirty = true;
            };
            return Zone2;
        })(State.AbstractZone);
        State.Zone2 = Zone2;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone2Level1 = (function (_super) {
            __extends(Zone2Level1, _super);
            function Zone2Level1() {
                _super.apply(this, arguments);
            }
            Zone2Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/2-1.json', null, Phaser.Tilemap.TILED_JSON);
            };
            Zone2Level1.prototype.create = function () {
                _super.prototype.create.call(this);
            };
            Zone2Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone2Level1;
        })(State.Zone2);
        State.Zone2Level1 = Zone2Level1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone3 = (function (_super) {
            __extends(Zone3, _super);
            function Zone3() {
                _super.apply(this, arguments);
            }
            Zone3.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.image('bg', 'assets/images/zone3.png');
                this.game.load.spritesheet('snowflake', 'assets/images/snowflake.png', 16, 16);
            };
            Zone3.prototype.create = function () {
                this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
                this.bg.fixedToCamera = true;
                _super.prototype.create.call(this);
                this.player.body.drag.x = 10;
                this.createSnowFlakes();
            };
            Zone3.prototype.createSnowFlakes = function () {
                this.emitter = this.game.add.emitter(this.game.world.centerX, 0, 100);
                this.emitter.width = this.game.world.width;
                this.emitter.makeParticles('snowflake');
                this.emitter.minParticleScale = 0.2;
                this.emitter.maxParticleScale = 1.5;
                this.emitter.gravity = 5;
                this.emitter.setYSpeed(5, 20);
                this.emitter.setXSpeed(-15, 15);
                this.emitter.minRotation = 0;
                this.emitter.maxRotation = 0;
                this.emitter.start(false, 20000, 200, 0);
            };
            Zone3.prototype.update = function () {
                this.emitter.emitY = this.camera.y;
                _super.prototype.update.call(this);
                this.bg.tilePosition.x = -this.player.x / 50;
            };
            return Zone3;
        })(State.AbstractZone);
        State.Zone3 = Zone3;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone3Level1 = (function (_super) {
            __extends(Zone3Level1, _super);
            function Zone3Level1() {
                _super.apply(this, arguments);
            }
            Zone3Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/3-1.json', null, Phaser.Tilemap.TILED_JSON);
            };
            Zone3Level1.prototype.create = function () {
                _super.prototype.create.call(this);
                this.player.y = 100;
            };
            Zone3Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone3Level1;
        })(State.Zone3);
        State.Zone3Level1 = Zone3Level1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone4 = (function (_super) {
            __extends(Zone4, _super);
            function Zone4() {
                _super.apply(this, arguments);
            }
            Zone4.prototype.preload = function () {
                this.game.load.image('bg', 'assets/images/zone4.jpg');
                _super.prototype.preload.call(this);
            };
            Zone4.prototype.create = function () {
                this.bg = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'bg');
                this.bg.fixedToCamera = true;
                _super.prototype.create.call(this);
            };
            Zone4.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4;
        })(State.AbstractZone);
        State.Zone4 = Zone4;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var Zone4Level1 = (function (_super) {
            __extends(Zone4Level1, _super);
            function Zone4Level1() {
                _super.apply(this, arguments);
            }
            Zone4Level1.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.game.load.tilemap('map', 'assets/levels/4-1.json', null, Phaser.Tilemap.TILED_JSON);
            };
            Zone4Level1.prototype.create = function () {
                _super.prototype.create.call(this);
                //this.player.x = this.game.world.width - 600;
                var bossTweens = this.getPrefabsFromMap('tween');
                this.boss = new Sample.Prefab.Boss(this.game, bossTweens);
            };
            Zone4Level1.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            return Zone4Level1;
        })(State.Zone4);
        State.Zone4Level1 = Zone4Level1;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var State;
    (function (State) {
        var GameOver = (function (_super) {
            __extends(GameOver, _super);
            function GameOver() {
                _super.apply(this, arguments);
                this.content = [
                    ' ',
                    'Выбравшись из лабиринтов замка, твои глаза ослепил солнечный свет.',
                    'Ты рад окончанию истории, приключившейся с тобой.',
                    'Немного оглядевшись, ты увидел кусок бумаги под камнем.',
                    'Достав ее, ты прочитал',
                    'Продолжение следует...',
                    ' '
                ];
                this.index = 0;
                this.line = '';
            }
            GameOver.prototype.create = function () {
                this.game.stage.backgroundColor = '#000000';
                this.text = this.game.add.text(10, 10, '', Sample.settings.font.whiteBig);
                this.text.wordWrap = true;
                this.text.wordWrapWidth = this.game.width;
                this.nextLine();
            };
            GameOver.prototype.nextLine = function () {
                this.index++;
                if (this.index < this.content.length) {
                    this.line = '';
                    this.game.time.events.repeat(80, this.content[this.index].length + 1, this.updateLine, this);
                }
                else {
                }
            };
            GameOver.prototype.updateLine = function () {
                if (this.line.length < this.content[this.index].length) {
                    this.line = this.content[this.index].substr(0, this.line.length + 1);
                    this.text.setText(this.line);
                }
                else {
                    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.nextLine, this);
                }
            };
            return GameOver;
        })(Phaser.State);
        State.GameOver = GameOver;
    })(State = Sample.State || (Sample.State = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var AbstractPrefab = (function (_super) {
            __extends(AbstractPrefab, _super);
            function AbstractPrefab(game, x, y, texture) {
                _super.call(this, game, x, y, texture);
                this.level = this.game.state.states[this.game.state.current];
                game.add.existing(this);
            }
            return AbstractPrefab;
        })(Phaser.Sprite);
        Prefab.AbstractPrefab = AbstractPrefab;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Player = (function (_super) {
            __extends(Player, _super);
            function Player(game, x, y) {
                var _this = this;
                _super.call(this, game, x, y, 'player');
                game.physics.arcade.enable(this);
                this.gravity = 500;
                this.acceleration = 500;
                this.drag = 500;
                this.maxSpeed = 270;
                this.jumpPower = 350;
                this.immortalState = false;
                this.attackState = false;
                this.moveState = false;
                this.defensePoints = 5;
                this.direction = Sample.Direction.Right;
                this.damagePoints = 50;
                this.immortalStateAt = this.game.time.now;
                this.attackStateAt = this.game.time.now;
                ;
                this.immortalDuration = Phaser.Timer.SECOND * 3;
                this.immortalDefaultDuration = Phaser.Timer.SECOND * 3;
                this.attackDuration = Phaser.Timer.SECOND / 3;
                this.isActiveJumpKey = false;
                this.isAttackKeyPressed = false;
                this.body.gravity.y = this.gravity;
                this.anchor.set(0.5, 1);
                this.body.drag.x = this.drag;
                this.body.maxVelocity.x = this.maxSpeed;
                this.body.maxVelocity.y = this.jumpPower * 2;
                this.body.collideWorldBounds = true;
                this.alive = true;
                this.health = +Sample.settings.storage.getHealthPoints();
                this.animations.add('stay', ['player-walk-1.png'], 10, true);
                this.animations.add('walk', Phaser.Animation.generateFrameNames('player-walk-', 1, 4, '.png', 0), 15, true);
                this.animations.add('attack', Phaser.Animation.generateFrameNames('player-attack-', 1, 3, '.png', 0), 10, true);
                this.events.onKilled.add(function () {
                    _this.level.gameOver();
                });
            }
            Player.prototype.getHP = function (healthPoints) {
                this.health += +healthPoints;
                this.level.hud.updateHealthState();
                this.write(healthPoints.toString() + 'HP', Sample.settings.font.whiteWithBlue);
            };
            Player.prototype.immortal = function (duration) {
                this.immortalDuration = duration;
                this.immortalStateAt = this.game.time.now;
                this.immortalState = true;
                this.alpha = 0.5;
            };
            Player.prototype.write = function (text, style) {
                var textSprite = this.game.add.text(this.x, this.y, text, style);
                var tween = this.game.add.tween(textSprite).to({ alpha: 0 }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true, 0, 0, false);
                tween.onComplete.add(function () {
                    textSprite.destroy();
                });
            };
            Player.prototype.makeDamage = function (damagePoint) {
                if (damagePoint < this.defensePoints) {
                    damagePoint = 1;
                }
                else {
                    damagePoint = damagePoint - this.defensePoints;
                }
                this.damage(damagePoint);
                this.write(damagePoint.toString(), Sample.settings.font.whiteWithRed);
                this.immortal(this.immortalDefaultDuration);
            };
            Player.prototype.jump = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.jump)
                    && (this.body.blocked.down || this.body.touching.down)
                    && !this.isActiveJumpKey) {
                    this.isActiveJumpKey = true;
                    this.body.velocity.y = -this.jumpPower;
                }
                if (!this.game.input.keyboard.isDown(Sample.settings.keys.jump)) {
                    this.isActiveJumpKey = false;
                }
            };
            Player.prototype.move = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.moveRight)) {
                    this.moveState = true;
                    this.body.acceleration.x = this.acceleration;
                    this.direction = Sample.Direction.Right;
                    this.scale.x = 1;
                }
                else if (this.game.input.keyboard.isDown(Sample.settings.keys.moveLeft)) {
                    this.moveState = true;
                    this.body.acceleration.x = -this.acceleration;
                    this.direction = Sample.Direction.Left;
                    this.scale.x = -1;
                }
                else {
                    this.moveState = false;
                    this.body.acceleration.x = 0;
                }
            };
            Player.prototype.attack = function () {
                if (this.game.input.keyboard.isDown(Sample.settings.keys.attack) && !this.attackState && !this.isAttackKeyPressed) {
                    this.isAttackKeyPressed = true;
                    this.attackState = true;
                    this.attackStateAt = this.game.time.now;
                }
                if (!this.game.input.keyboard.isDown(Sample.settings.keys.attack)) {
                    this.isAttackKeyPressed = false;
                }
                if ((this.game.time.now - this.attackStateAt) > this.attackDuration) {
                    this.attackState = false;
                }
            };
            Player.prototype.state = function () {
                if (this.immortalState && (this.game.time.now - this.immortalStateAt) > this.immortalDuration) {
                    this.alpha = 1;
                    this.immortalState = false;
                }
                if (this.attackState) {
                    this.animations.play('attack');
                }
                else if (this.moveState) {
                    this.animations.play('walk');
                }
                else {
                    this.animations.play('stay');
                }
                this.body.width = this.animations.currentFrame.width;
                this.body.height = this.animations.currentFrame.height;
            };
            Player.prototype.update = function () {
                this.game.physics.arcade.collide(this, this.level.layer);
                this.move();
                this.jump();
                this.attack();
                this.state();
            };
            return Player;
        })(Prefab.AbstractPrefab);
        Prefab.Player = Player;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var HUD = (function (_super) {
            __extends(HUD, _super);
            function HUD(game, x, y) {
                _super.call(this, game, x, y, 'hud');
                this.fixedToCamera = true;
                var font = {
                    font: "13px Arial",
                    fill: "#ffffff"
                };
                this.healthState = game.add.text(14, 1, "", font);
                this.updateHealthState();
                this.addChild(this.healthState);
            }
            HUD.prototype.updateHealthState = function () {
                this.healthState.text = this.level.player.health.toString();
            };
            HUD.prototype.update = function () {
            };
            return HUD;
        })(Prefab.AbstractPrefab);
        Prefab.HUD = HUD;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var BlackScreen = (function (_super) {
            __extends(BlackScreen, _super);
            function BlackScreen(game) {
                var blackTexture = game.add.bitmapData(game.width, game.height);
                blackTexture.ctx.beginPath();
                blackTexture.ctx.rect(0, 0, game.width, game.height);
                blackTexture.ctx.fillStyle = '#000000';
                blackTexture.ctx.fill();
                _super.call(this, game, 0, 0, blackTexture);
                this.alpha = 1;
                this.fixedToCamera = true;
                this.text = game.add.text(10, game.height - 30, "", Sample.settings.font.whiteBig);
                this.addChild(this.text);
            }
            BlackScreen.prototype.setText = function (text) {
                this.text.text = text;
            };
            BlackScreen.prototype.update = function () {
                this.bringToTop();
            };
            return BlackScreen;
        })(Prefab.AbstractPrefab);
        Prefab.BlackScreen = BlackScreen;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var PreloadBar = (function (_super) {
            __extends(PreloadBar, _super);
            function PreloadBar(game, x, y) {
                _super.call(this, game, x, y, 'preload-bar');
                this.anchor.setTo(1, 1);
            }
            return PreloadBar;
        })(Prefab.AbstractPrefab);
        Prefab.PreloadBar = PreloadBar;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Transparent = (function (_super) {
            __extends(Transparent, _super);
            function Transparent(game, x, y) {
                _super.call(this, game, x, y, 'transparent');
                game.physics.arcade.enable(this);
                //this.body.immovable = true;
                this.body.moves = false;
            }
            return Transparent;
        })(Prefab.AbstractPrefab);
        Prefab.Transparent = Transparent;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Spike = (function (_super) {
            __extends(Spike, _super);
            function Spike(game, x, y) {
                _super.call(this, game, x, y, 'spike');
                this.damagePoints = 10;
                game.physics.arcade.enable(this);
                this.body.immovable = true;
            }
            Spike.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.collide(this.level.player, this, function (player, spike) {
                    if (!_this.level.player.immortalState) {
                        _this.level.player.makeDamage(spike.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
            };
            return Spike;
        })(Prefab.AbstractPrefab);
        Prefab.Spike = Spike;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var IceSpike = (function (_super) {
            __extends(IceSpike, _super);
            function IceSpike(game, x, y) {
                _super.call(this, game, x, y, 'ice-spike');
                this.damagePoints = 10;
                this.distanceToTarget = Math.random() * 100 - 40; // from - 40 to 60 px to target
                game.physics.arcade.enable(this);
                this.checkWorldBounds = true;
            }
            IceSpike.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.overlap(this.level.player, this, function (player, ice) {
                    if (!_this.level.player.immortalState) {
                        _this.level.player.makeDamage(ice.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
                if (!this.inCamera)
                    return;
                if (Math.abs(this.level.player.x - this.body.x) < this.distanceToTarget && this.level.player.y > this.body.y) {
                    this.body.gravity.y = 100;
                    this.body.acceleration.y = 1000;
                }
                if (this.y > this.game.world.height) {
                    this.kill();
                }
            };
            return IceSpike;
        })(Prefab.AbstractPrefab);
        Prefab.IceSpike = IceSpike;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Exit = (function (_super) {
            __extends(Exit, _super);
            function Exit(game, x, y) {
                _super.call(this, game, x, y, 'exit');
                game.physics.arcade.enable(this);
                this.body.immovable = true;
            }
            Exit.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.collide(this.level.player, this.level.exits, function (player, exit) {
                    _this.level.startNextLevel();
                });
            };
            return Exit;
        })(Prefab.AbstractPrefab);
        Prefab.Exit = Exit;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Platform = (function (_super) {
            __extends(Platform, _super);
            function Platform(game, x, y, texture) {
                _super.call(this, game, x, y, texture);
                game.physics.arcade.enable(this);
                this.body.immovable = true;
                this.velocity = 100;
            }
            Platform.prototype.toggleDirection = function () {
                switch (this.direction) {
                    case Sample.Direction.Up:
                        this.direction = Sample.Direction.Down;
                        this.body.velocity.y = this.velocity;
                        break;
                    case Sample.Direction.Down:
                        this.direction = Sample.Direction.Up;
                        this.body.velocity.y = -this.velocity;
                        break;
                    case Sample.Direction.Left:
                        this.direction = Sample.Direction.Right;
                        this.body.velocity.x = this.velocity;
                        break;
                    case Sample.Direction.Right:
                        this.direction = Sample.Direction.Left;
                        this.body.velocity.x = -this.velocity;
                        break;
                    default:
                        // Don't doing something
                        break;
                }
            };
            Platform.prototype.update = function () {
                this.game.physics.arcade.collide(this.level.player, this, null, function (player, platform) {
                    return player.y - platform.body.height <= platform.y;
                });
                this.game.physics.arcade.collide(this, this.level.transparents, function (platform, transparent) {
                    platform.toggleDirection();
                });
            };
            return Platform;
        })(Prefab.AbstractPrefab);
        Prefab.Platform = Platform;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var PlatformHorizontal = (function (_super) {
            __extends(PlatformHorizontal, _super);
            function PlatformHorizontal(game, x, y) {
                _super.call(this, game, x, y, 'platform-h');
                game.physics.arcade.enable(this);
                this.body.immovable = true;
                this.direction = Sample.Direction.Right;
                this.body.velocity.x = this.velocity;
            }
            return PlatformHorizontal;
        })(Prefab.Platform);
        Prefab.PlatformHorizontal = PlatformHorizontal;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var PlatformVertical = (function (_super) {
            __extends(PlatformVertical, _super);
            function PlatformVertical(game, x, y) {
                _super.call(this, game, x, y, 'platform-v');
                game.physics.arcade.enable(this);
                this.body.immovable = true;
                this.direction = Sample.Direction.Down;
                this.body.velocity.y = this.velocity;
            }
            return PlatformVertical;
        })(Prefab.Platform);
        Prefab.PlatformVertical = PlatformVertical;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Bottle = (function (_super) {
            __extends(Bottle, _super);
            function Bottle(game, x, y, texture) {
                _super.call(this, game, x, y, texture);
                game.physics.arcade.enable(this);
            }
            Bottle.prototype.update = function () {
                this.game.physics.arcade.overlap(this.level.player, this, function (player, bottle) {
                    bottle.makeAction();
                    bottle.kill();
                });
            };
            return Bottle;
        })(Prefab.AbstractPrefab);
        Prefab.Bottle = Bottle;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var BottleHP = (function (_super) {
            __extends(BottleHP, _super);
            function BottleHP(game, x, y) {
                _super.call(this, game, x, y, 'bottle-hp');
                this.amount = 30;
                game.physics.arcade.enable(this);
            }
            BottleHP.prototype.makeAction = function () {
                this.level.player.getHP(this.amount);
            };
            return BottleHP;
        })(Prefab.Bottle);
        Prefab.BottleHP = BottleHP;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var BottleSuper = (function (_super) {
            __extends(BottleSuper, _super);
            function BottleSuper(game, x, y) {
                _super.call(this, game, x, y, 'bottle-super');
                this.duration = Phaser.Timer.SECOND * 10;
                game.physics.arcade.enable(this);
            }
            BottleSuper.prototype.makeAction = function () {
                this.level.player.immortal(this.duration);
            };
            return BottleSuper;
        })(Prefab.Bottle);
        Prefab.BottleSuper = BottleSuper;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var AbstractEnemy = (function (_super) {
            __extends(AbstractEnemy, _super);
            function AbstractEnemy(game, x, y, sprite) {
                _super.call(this, game, x, y, sprite);
                this.defensePoints = 0;
                this.damagePoints = 0;
                game.physics.arcade.enable(this);
                this.alive = true;
                this.anchor.set(0, 0.5);
                this.immortalState = false;
                this.immortalStateAt = game.time.now;
                this.immortalStateDuration = Phaser.Timer.SECOND / 3;
                this.defensePoints = 0;
            }
            AbstractEnemy.prototype.makeDamage = function (damagePoint) {
                if (!this.immortalState) {
                    if (damagePoint < this.defensePoints) {
                        damagePoint = 1;
                    }
                    else {
                        damagePoint = damagePoint - this.defensePoints;
                    }
                    this.damage(damagePoint);
                    var textStyle = {
                        font: "20px Arial",
                        fill: "#ffffff",
                        stroke: '#0000ff',
                        strokeThickness: 1
                    };
                    var text = this.game.add.text(this.x, this.y, damagePoint.toString(), textStyle);
                    var tween = this.game.add.tween(text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    tween.onComplete.add(function () {
                        text.destroy();
                    });
                    this.immortalStateAt = Date.now();
                    this.immortalState = true;
                }
            };
            AbstractEnemy.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.overlap(this.level.player, this, function (player, enemy) {
                    if (player.attackState) {
                        enemy.makeDamage(player.damagePoints);
                    }
                    else if (!_this.level.player.immortalState) {
                        _this.level.player.makeDamage(enemy.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
                if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
                    this.immortalState = false;
                }
            };
            return AbstractEnemy;
        })(Prefab.AbstractPrefab);
        Prefab.AbstractEnemy = AbstractEnemy;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Runner = (function (_super) {
            __extends(Runner, _super);
            function Runner(game, x, y) {
                _super.call(this, game, x, y, 'runner');
                this.gravity = 300;
                this.velocity = 100;
                this.direction = Sample.Direction.Right;
                this.body.velocity.x = this.velocity;
                this.damagePoints = 9;
                this.defensePoints = 3;
                this.body.gravity.y = this.gravity;
                this.body.collideWorldBounds = true;
                this.health = 90;
                this.anchor.set(0.5, 1);
                this.animations.add('walk', Phaser.Animation.generateFrameNames('runner-', 1, 4, '.png', 0), 5, true);
                this.animations.play('walk');
            }
            Runner.prototype.toggleDirection = function () {
                switch (this.direction) {
                    case Sample.Direction.Left:
                        this.direction = Sample.Direction.Right;
                        this.body.velocity.x = this.velocity;
                        this.scale.x = 1;
                        break;
                    case Sample.Direction.Right:
                        this.direction = Sample.Direction.Left;
                        this.body.velocity.x = -this.velocity;
                        this.scale.x = -1;
                        break;
                    default:
                }
            };
            Runner.prototype.update = function () {
                _super.prototype.update.call(this);
                this.game.physics.arcade.collide(this, this.level.layer);
                this.game.physics.arcade.collide(this, this.level.transparents, function (runner, transparent) {
                    runner.toggleDirection();
                });
                if (this.body.blocked.left || this.body.blocked.right) {
                    this.toggleDirection();
                }
            };
            return Runner;
        })(Prefab.AbstractEnemy);
        Prefab.Runner = Runner;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Flier = (function (_super) {
            __extends(Flier, _super);
            function Flier(game, x, y) {
                _super.call(this, game, x, y, 'flier');
                this.isActive = false;
                this.damagePoints = 10;
                this.speed = 150;
                this.defensePoints = 7;
                this.anchor.set(0.5, 0.5);
                this.health = 84;
                this.minDistance = this.level.player.width / 2;
                this.isActive = true;
                this.animations.add('fly', Phaser.Animation.generateFrameNames('flier-', 1, 4, '.png', 0), 20, true);
                this.animations.play('fly');
            }
            Flier.prototype.update = function () {
                _super.prototype.update.call(this);
                if (!this.inCamera || !this.alive) {
                    this.body.velocity.setTo(0, 0);
                    return;
                }
                var distance = Phaser.Math.distance(this.x, this.y, this.level.player.x, this.level.player.y);
                if (distance > this.minDistance) {
                    var rotation = Phaser.Math.angleBetween(this.x, this.y, this.level.player.x, this.level.player.y);
                    this.body.velocity.x = Math.cos(rotation) * this.speed;
                    this.body.velocity.y = Math.sin(rotation) * this.speed;
                }
                else {
                    this.body.velocity.setTo(0, 0);
                }
            };
            return Flier;
        })(Prefab.AbstractEnemy);
        Prefab.Flier = Flier;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var FlierCrash = (function (_super) {
            __extends(FlierCrash, _super);
            function FlierCrash(game, x, y) {
                _super.call(this, game, x, y, 'flier-crash');
                this.anchor.set(0.5, 0.5);
                this.health = 52;
                this.eggs = this.game.add.group();
                this.countEggs = 10;
                for (var i = 0; i < this.countEggs; i++) {
                    var egg = new Prefab.Egg(game, 0, 0);
                    this.eggs.add(egg);
                }
                this.minDistance = this.level.player.width / 2;
                this.isAttackOver = false;
                this.damagePoints = 11;
                this.velocity = 100;
                this.isActive = false;
                this.defensePoints = 6;
                this.lastEggShotAt = this.game.time.now;
                this.shotDelay = 1500;
                this.animations.add('fly', Phaser.Animation.generateFrameNames('flier-crash-', 1, 4, '.png', 0), 20, true);
                this.animations.play('fly');
            }
            FlierCrash.prototype.update = function () {
                _super.prototype.update.call(this);
                if (!this.inCamera || !this.alive) {
                    this.body.velocity.setTo(0, 0);
                    return;
                }
                if (!this.isAttackOver) {
                    var distance = Phaser.Math.distance(this.x, this.y, this.level.player.x, this.level.player.y - this.level.player.body.height * 4);
                    if (distance > this.minDistance) {
                        var rotation = Phaser.Math.angleBetween(this.x, this.y, this.level.player.x, this.level.player.y - this.level.player.body.height * 4);
                        this.body.velocity.x = Math.cos(rotation) * this.velocity;
                        this.body.velocity.y = Math.sin(rotation) * this.velocity;
                    }
                    else {
                        this.body.velocity.y = -30;
                        if (this.level.player.x > this.x) {
                            this.body.velocity.x = this.velocity;
                        }
                        else {
                            this.body.velocity.x = -this.velocity;
                        }
                    }
                }
                if (this.game.time.now - this.lastEggShotAt < this.shotDelay)
                    return;
                this.lastEggShotAt = this.game.time.now;
                var egg = this.eggs.getFirstDead();
                if (egg === null || egg === undefined)
                    return;
                egg.revive();
                egg.reset(this.x, this.y);
                egg.body.velocity.y = egg.speed;
                egg.animations.play('egg');
            };
            return FlierCrash;
        })(Prefab.AbstractEnemy);
        Prefab.FlierCrash = FlierCrash;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Shooter = (function (_super) {
            __extends(Shooter, _super);
            function Shooter(game, x, y) {
                var _this = this;
                _super.call(this, game, x, y, 'shooter');
                this.body.gravity.y = 300;
                this.lastBulletShotAt = this.game.time.now;
                this.countBullets = 10;
                this.shotDelay = Phaser.Timer.SECOND * 3;
                this.damagePoints = 10;
                this.defensePoints = 5;
                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.Bullet(game, 0, 0);
                    this.bullets.add(bullet);
                }
                this.health = 100;
                this.game.onResume.add(function () {
                    _this.lastBulletShotAt += _this.game.time.pauseDuration;
                });
                this.animations.add('stay', ['shooter-stay-1.png'], 10, true);
                this.animations.add('shot', ['shooter-shot-1.png'], 10, true);
                this.animations.play('stay');
                this.anchor.set(0.5, 0.5);
            }
            Shooter.prototype.update = function () {
                _super.prototype.update.call(this);
                this.game.physics.arcade.collide(this, this.level.layer);
                if (!this.inCamera || !this.alive) {
                    this.body.velocity.setTo(0, 0);
                    return;
                }
                if (this.game.time.now - this.lastBulletShotAt < Phaser.Timer.SECOND / 4) {
                    this.animations.play('shot');
                }
                else {
                    this.animations.play('stay');
                }
                if (this.game.time.now - this.lastBulletShotAt < this.shotDelay)
                    return;
                this.lastBulletShotAt = this.game.time.now;
                var bullet = this.bullets.getFirstDead();
                if (bullet === null || bullet === undefined)
                    return;
                bullet.revive();
                bullet.reset(this.x, this.y);
                if (this.x > this.level.player.x) {
                    this.scale.x = -1;
                    bullet.scale.x = -1;
                    bullet.body.velocity.x = -bullet.speed;
                }
                else {
                    this.scale.x = 1;
                    bullet.scale.x = 1;
                    bullet.body.velocity.x = bullet.speed;
                }
            };
            return Shooter;
        })(Prefab.AbstractEnemy);
        Prefab.Shooter = Shooter;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var ShooterReject = (function (_super) {
            __extends(ShooterReject, _super);
            function ShooterReject(game, x, y) {
                var _this = this;
                _super.call(this, game, x, y, 'shooter-reject');
                this.body.gravity.y = 300;
                this.damagePoints = 10;
                this.defensePoints = 50;
                this.lastBulletShotAt = this.game.time.now;
                this.countBullets = 10;
                this.shotDelay = Phaser.Timer.SECOND * 3;
                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.BulletReject(game, 0, 0);
                    this.bullets.add(bullet);
                }
                this.health = 100;
                this.game.onResume.add(function () {
                    _this.lastBulletShotAt += _this.game.time.pauseDuration;
                });
                this.animations.add('stay', ['shooter-reject-stay-1.png'], 10, true);
                this.animations.add('shot', ['shooter-reject-shot-1.png'], 10, true);
                this.animations.play('stay');
                this.anchor.set(0.5, 0.5);
            }
            ShooterReject.prototype.update = function () {
                var _this = this;
                _super.prototype.update.call(this);
                this.game.physics.arcade.collide(this, this.level.layer);
                this.game.physics.arcade.overlap(this, this.bullets, function (shooterReject, bulletReject) {
                    if (bulletReject.rejectState) {
                        bulletReject.kill();
                        _this.makeDamage(bulletReject.damageRejectPoints);
                    }
                });
                if (!this.inCamera || !this.alive) {
                    this.body.velocity.setTo(0, 0);
                    return;
                }
                if (this.game.time.now - this.lastBulletShotAt < Phaser.Timer.SECOND / 3) {
                    this.animations.play('shot');
                }
                else {
                    this.animations.play('stay');
                }
                if (this.game.time.now - this.lastBulletShotAt < this.shotDelay)
                    return;
                this.lastBulletShotAt = this.game.time.now;
                var bullet = this.bullets.getFirstDead();
                if (bullet === null || bullet === undefined)
                    return;
                bullet.revive();
                bullet.reset(this.x, this.y);
                if (this.x > this.level.player.x) {
                    bullet.body.velocity.x = -bullet.speed;
                    bullet.scale.x = -1;
                    this.scale.x = -1;
                }
                else {
                    bullet.body.velocity.x = bullet.speed;
                    bullet.scale.x = 1;
                    this.scale.x = 1;
                }
            };
            return ShooterReject;
        })(Prefab.AbstractEnemy);
        Prefab.ShooterReject = ShooterReject;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Boss = (function (_super) {
            __extends(Boss, _super);
            function Boss(game, bossTweens) {
                var _this = this;
                _super.call(this, game, bossTweens.children[0].x, bossTweens.children[0].y, 'boss');
                this.inAction = false;
                this.isProtect = true;
                this.health = 100;
                this.damagePoints = 10;
                this.defensePoints = 40;
                this.activeTweenID = 0;
                this.bossTweens = bossTweens;
                this.lastEventAt = this.game.time.now;
                this.lastBulletShotAt = this.game.time.now;
                this.countBullets = 10;
                this.shotDelay = Phaser.Timer.SECOND * 3;
                this.bullets = this.game.add.group();
                for (var i = 0; i < this.countBullets; i++) {
                    var bullet = new Prefab.BulletReject(game, 0, 0);
                    this.bullets.add(bullet);
                }
                this.game.onResume.add(function () {
                    _this.lastBulletShotAt += _this.game.time.pauseDuration;
                });
                this.animations.add('move', Phaser.Animation.generateFrameNames('boss-', 1, 4, '.png', 0), 20, true);
                this.animations.add('blue', Phaser.Animation.generateFrameNames('boss-blue-', 1, 4, '.png', 0), 20, true);
                this.animations.play('move');
                this.anchor.set(0.5, 1);
                this.lightningBitmap = this.game.add.bitmapData(200, 1000);
                this.lightning = this.game.add.image(this.game.width / 2, 0, this.lightningBitmap);
                this.lightning.anchor.setTo(0.5, 0);
                this.lightning.fixedToCamera = true;
                this.flash = this.game.add.graphics(0, 0);
                this.flash.beginFill(0xffffff, 1);
                this.flash.drawRect(0, 0, this.game.width, this.game.height);
                this.flash.endFill();
                this.flash.alpha = 0;
                this.flash.fixedToCamera = true;
                this.events.onKilled.add(function () {
                    _this.boom();
                    _this.game.add.tween(_this.level.blackScreen)
                        .to({ alpha: 1 }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
                        .onComplete.add(function () {
                        _this.level.startNextLevel();
                    });
                });
            }
            Boss.prototype.generateAction = function () {
                var _this = this;
                this.lastEventAt = this.game.time.now;
                do {
                    var rand = Math.floor(Math.random() * this.bossTweens.children.length);
                } while (rand == this.activeTweenID);
                this.activeTweenID = rand;
                var tween = this.game.add.tween(this);
                tween.to({
                    x: this.bossTweens.children[this.activeTweenID].x,
                    y: this.bossTweens.children[this.activeTweenID].y
                }, Math.random() * 1000 + 2000, Phaser.Easing.Quadratic.In, true, 0, 0, false);
                tween.onComplete.add(function () {
                    _this.inAction = false;
                });
            };
            Boss.prototype.update = function () {
                var _this = this;
                if (!this.alive)
                    return;
                this.game.physics.arcade.overlap(this, this.bullets, function (shooterReject, bulletReject) {
                    if (bulletReject.rejectState) {
                        bulletReject.kill();
                        _this.animations.play('blue');
                        _this.isProtect = false;
                    }
                });
                this.game.physics.arcade.overlap(this.level.player, this, function (player, enemy) {
                    if (player.attackState) {
                        if (_this.isProtect) {
                            _this.makeDamage(1);
                        }
                        else {
                            _this.makeDamage(player.damagePoints);
                            _this.isProtect = true;
                            _this.animations.play('move');
                        }
                    }
                    else if (!_this.level.player.immortalState) {
                        _this.level.player.makeDamage(enemy.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
                if (!this.inAction) {
                    this.inAction = true;
                    this.generateAction();
                }
                if (this.game.time.now - this.lastBulletShotAt < this.shotDelay)
                    return;
                this.lastBulletShotAt = this.game.time.now;
                var bullet = this.bullets.getFirstDead();
                if (bullet === null || bullet === undefined)
                    return;
                bullet.revive();
                bullet.reset(this.x, this.y);
                bullet.rejectState = false;
                if (this.x > this.level.player.x) {
                    bullet.body.velocity.x = -bullet.speed;
                    bullet.scale.x = -1;
                    this.scale.x = -1;
                }
                else {
                    bullet.body.velocity.x = bullet.speed;
                    bullet.scale.x = 1;
                    this.scale.x = 1;
                }
                if (this.immortalState && Date.now() - this.immortalStateAt > this.immortalStateDuration) {
                    this.immortalState = false;
                }
            };
            Boss.prototype.boom = function () {
                // Rotate the lightning sprite so it goes in the
                // direction of the pointer
                this.lightning.rotation =
                    Phaser.Math.angleBetween(this.lightning.x, this.lightning.y, this.x, this.y) - Math.PI / 2;
                // Calculate the distance from the lightning source to the pointer
                var distance = Phaser.Math.distance(this.lightning.x, this.lightning.y, this.x, this.y);
                // Create the lightning texture
                this.createLightningTexture(this.lightningBitmap.width / 2, 0, 100, 3, false, distance);
                // Make the lightning sprite visible
                this.lightning.alpha = 1;
                // Fade out the lightning sprite using a tween on the alpha property.
                // Check out the "Easing function" examples for more info.
                this.game.add.tween(this.lightning)
                    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 0.5 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 1.0 }, 100, Phaser.Easing.Bounce.Out)
                    .to({ alpha: 0 }, 250, Phaser.Easing.Cubic.In)
                    .start();
                // Create the flash
                this.flash.alpha = 1;
                this.game.add.tween(this.flash)
                    .to({ alpha: 0 }, 100, Phaser.Easing.Cubic.In)
                    .start();
            };
            Boss.prototype.createLightningTexture = function (x, y, segments, boltWidth, branch, distance) {
                // Get the canvas drawing context for the lightningBitmap
                var ctx = this.lightningBitmap.context;
                var width = this.lightningBitmap.width;
                var height = this.lightningBitmap.height;
                // Our lightning will be made up of several line segments starting at
                // the center of the top edge of the bitmap and ending at the target.
                // Clear the canvas
                if (!branch)
                    ctx.clearRect(0, 0, width, height);
                // Draw each of the segments
                for (var i = 0; i < segments; i++) {
                    // Set the lightning color and bolt width
                    ctx.strokeStyle = 'rgb(255, 255, 255)';
                    ctx.lineWidth = boltWidth;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    // Calculate an x offset from the end of the last line segment and
                    // keep it within the bounds of the bitmap
                    if (branch) {
                        // For a branch
                        x += this.game.rnd.integerInRange(-10, 10);
                    }
                    else {
                        // For the main bolt
                        x += this.game.rnd.integerInRange(-30, 30);
                    }
                    if (x <= 10)
                        x = 10;
                    if (x >= width - 10)
                        x = width - 10;
                    // Calculate a y offset from the end of the last line segment.
                    // When we've reached the target or there are no more segments left,
                    // set the y position to the distance to the target. For branches, we
                    // don't care if they reach the target so don't set the last coordinate
                    // to the target if it's hanging in the air.
                    if (branch) {
                        // For a branch
                        y += this.game.rnd.integerInRange(10, 20);
                    }
                    else {
                        // For the main bolt
                        y += this.game.rnd.integerInRange(20, distance / segments);
                    }
                    if ((!branch && i == segments - 1) || y > distance) {
                        // This causes the bolt to always terminate at the center
                        // lightning bolt bounding box at the correct distance to
                        // the target. Because of the way the lightning sprite is
                        // rotated, this causes this point to be exactly where the
                        // player clicked or tapped.
                        y = distance;
                        if (!branch)
                            x = width / 2;
                    }
                    // Draw the line segment
                    ctx.lineTo(x, y);
                    ctx.stroke();
                    // Quit when we've reached the target
                    if (y >= distance)
                        break;
                    // Draw a branch 20% of the time off the main bolt only
                    if (!branch) {
                        if (Phaser.Math.chanceRoll(20)) {
                            // Draws another, thinner, bolt starting from this position
                            this.createLightningTexture(x, y, 10, 1, true, distance);
                        }
                    }
                }
                // This just tells the engine it should update the texture cache
                this.lightningBitmap.dirty = true;
            };
            return Boss;
        })(Prefab.AbstractEnemy);
        Prefab.Boss = Boss;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Egg = (function (_super) {
            __extends(Egg, _super);
            function Egg(game, x, y) {
                _super.call(this, game, x, y, 'egg');
                this.speed = 180;
                this.damagePoints = 35;
                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();
                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;
                this.eggCrashState = false;
                this.animations.add('egg', ['egg.png'], 10, true);
                this.animations.add('egg-crash', ['egg-crash.png'], 10, true);
                this.animations.play('egg');
            }
            Egg.prototype.setEggCrash = function () {
                this.eggCrashState = true;
                this.animations.play('egg-crash');
                this.body.width = this.animations.currentFrame.width;
                this.body.height = this.animations.currentFrame.height;
            };
            Egg.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.collide(this, this.level.player, function (egg, player) {
                    egg.kill();
                    if (!_this.level.player.immortalState && !_this.level.player.attackState) {
                        _this.level.player.makeDamage(egg.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
                this.game.physics.arcade.collide(this, this.level.layer, function (egg, layer) {
                    if (!_this.eggCrashState) {
                        egg.setEggCrash();
                    }
                });
            };
            return Egg;
        })(Prefab.AbstractPrefab);
        Prefab.Egg = Egg;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var Bullet = (function (_super) {
            __extends(Bullet, _super);
            function Bullet(game, x, y) {
                _super.call(this, game, x, y, 'bullet');
                this.speed = 300;
                this.damagePoints = 20;
                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();
                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;
            }
            Bullet.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.collide(this, this.level.player, function (bullet, player) {
                    bullet.kill();
                    if (!_this.level.player.immortalState) {
                        _this.level.player.makeDamage(bullet.damagePoints);
                        _this.level.hud.updateHealthState();
                    }
                });
            };
            return Bullet;
        })(Prefab.AbstractPrefab);
        Prefab.Bullet = Bullet;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Prefab;
    (function (Prefab) {
        var BulletReject = (function (_super) {
            __extends(BulletReject, _super);
            function BulletReject(game, x, y) {
                _super.call(this, game, x, y, 'bullet-reject');
                this.speed = 300;
                this.damagePoints = 25;
                this.damageRejectPoints = 300;
                this.rejectState = false;
                game.physics.arcade.enable(this);
                this.anchor.set(0.5, 0.5);
                this.kill();
                this.checkWorldBounds = true;
                this.outOfBoundsKill = true;
            }
            BulletReject.prototype.update = function () {
                var _this = this;
                this.game.physics.arcade.overlap(this, this.level.player, function (bulletReject, player) {
                    if (bulletReject.rejectState)
                        return;
                    if (_this.level.player.attackState) {
                        bulletReject.scale.x = (bulletReject.scale.x == 1) ? -1 : 1;
                        bulletReject.body.velocity.x = -bulletReject.body.velocity.x;
                        bulletReject.rejectState = true;
                    }
                    else {
                        bulletReject.kill();
                        if (!_this.level.player.immortalState) {
                            _this.level.player.makeDamage(bulletReject.damagePoints);
                            _this.level.hud.updateHealthState();
                        }
                    }
                });
            };
            return BulletReject;
        })(Prefab.AbstractPrefab);
        Prefab.BulletReject = BulletReject;
    })(Prefab = Sample.Prefab || (Sample.Prefab = {}));
})(Sample || (Sample = {}));
/// <reference path="../vendor/phaser-official/build/phaser.d.ts"/>
/// <reference path="typing/stats.d.ts"/>
/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Stories/AbstractStory.ts'/>
/// <reference path='State/Stories/Story1.ts'/>
/// <reference path='State/Stories/Story2.ts'/>
/// <reference path='State/Stories/Story3.ts'/>
/// <reference path='State/Stories/Story4.ts'/>
/// <reference path='State/Levels/AbstractZone.ts'/>
/// <reference path='State/Levels/Zone1/Zone1.ts'/>
/// <reference path='State/Levels/Zone1/Level1.ts'/>
/// <reference path='State/Levels/Zone2/Zone2.ts'/>
/// <reference path='State/Levels/Zone2/Level1.ts'/>
/// <reference path='State/Levels/Zone3/Zone3.ts'/>
/// <reference path='State/Levels/Zone3/Level1.ts'/>
/// <reference path='State/Levels/Zone4/Zone4.ts'/>
/// <reference path='State/Levels/Zone4/Level1.ts'/>
/// <reference path='State/GameOver.ts'/>
/// <reference path='Prefab/AbstractPrefab.ts'/>
/// <reference path='Prefab/Player.ts'/>
/// <reference path='Prefab/HUD.ts'/>
/// <reference path='Prefab/BlackScreen.ts'/>
/// <reference path='Prefab/PreloadBar.ts'/>
/// <reference path='Prefab/Transparent.ts'/>
/// <reference path='Prefab/Spike.ts'/>
/// <reference path='Prefab/IceSpike.ts'/>
/// <reference path='Prefab/Exit.ts'/>
/// <reference path='Prefab/Platforms/Platform.ts'/>
/// <reference path='Prefab/Platforms/PlatformHorizontal.ts'/>
/// <reference path='Prefab/Platforms/PlatformVertical.ts'/>
/// <reference path='Prefab/Bottles/Bottle.ts'/>
/// <reference path='Prefab/Bottles/BottleHP.ts'/>
/// <reference path='Prefab/Bottles/BottleSuper.ts'/>
/// <reference path='Prefab/Enemies/AbstractEnemy.ts'/>
/// <reference path='Prefab/Enemies/Runner.ts'/>
/// <reference path='Prefab/Enemies/Flier.ts'/>
/// <reference path='Prefab/Enemies/FlierCrash.ts'/>
/// <reference path='Prefab/Enemies/Shooter.ts'/>
/// <reference path='Prefab/Enemies/ShooterReject.ts'/>
/// <reference path='Prefab/Enemies/Boss.ts'/>
/// <reference path='Prefab/Bullets/Egg.ts'/>
/// <reference path='Prefab/Bullets/Bullet.ts'/>
/// <reference path='Prefab/Bullets/BulletReject.ts'/>
var Sample;
(function (Sample) {
    (function (Stories) {
        Stories[Stories["Story1"] = 0] = "Story1";
        Stories[Stories["Story2"] = 1] = "Story2";
        Stories[Stories["Story3"] = 2] = "Story3";
        Stories[Stories["Story4"] = 3] = "Story4";
    })(Sample.Stories || (Sample.Stories = {}));
    var Stories = Sample.Stories;
    (function (Levels) {
        Levels[Levels["Zone1Level1"] = 0] = "Zone1Level1";
        Levels[Levels["Zone2Level1"] = 1] = "Zone2Level1";
        Levels[Levels["Zone3Level1"] = 2] = "Zone3Level1";
        Levels[Levels["Zone4Level1"] = 3] = "Zone4Level1";
    })(Sample.Levels || (Sample.Levels = {}));
    var Levels = Sample.Levels;
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
        Direction[Direction["Up"] = 2] = "Up";
        Direction[Direction["Down"] = 3] = "Down";
    })(Sample.Direction || (Sample.Direction = {}));
    var Direction = Sample.Direction;
    var Init = (function () {
        function Init() {
        }
        Init.HealthPoints = 100;
        Init.FirstState = Stories[Stories.Story1];
        return Init;
    })();
    var Storage = (function () {
        function Storage() {
        }
        Storage.prototype.getCurrentState = function () {
            var currentLevel = localStorage.getItem('currentLevel');
            if (currentLevel) {
                return currentLevel;
            }
            else {
                this.setCurrentState(Init.FirstState);
                return Init.FirstState;
            }
        };
        Storage.prototype.setCurrentState = function (currentState) {
            localStorage.setItem('currentLevel', currentState);
        };
        Storage.prototype.getHealthPoints = function () {
            var healthPoints = localStorage.getItem('healthPoints');
            if (healthPoints) {
                return healthPoints;
            }
            else {
                healthPoints = Init.HealthPoints.toString();
                this.setHealthPoints(healthPoints);
                return healthPoints;
            }
        };
        Storage.prototype.setHealthPoints = function (healthPoints) {
            localStorage.setItem('healthPoints', healthPoints);
        };
        return Storage;
    })();
    var SettingsClass = (function () {
        function SettingsClass() {
            this.storage = new Storage();
            this.font = {
                whiteWithRed: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "ff0000",
                    strokeThickness: 2
                },
                whiteWithBlue: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "0000ff",
                    strokeThickness: 2
                },
                whiteWithGreen: {
                    font: "20px Arial",
                    fill: "#ffffff",
                    stroke: "00ff00",
                    strokeThickness: 2
                },
                whiteBig: {
                    font: "20px Arial",
                    fill: "#ffffff"
                },
                blackBig: {
                    font: "20px Arial",
                    fill: "#000000"
                }
            };
            this.keys = {
                moveLeft: Phaser.Keyboard.LEFT,
                moveRight: Phaser.Keyboard.RIGHT,
                jump: Phaser.Keyboard.Z,
                attack: Phaser.Keyboard.X
            };
        }
        return SettingsClass;
    })();
    Sample.settings = new SettingsClass();
})(Sample || (Sample = {}));
/// <reference path='GlobalConfig.ts'/>
var Sample;
(function (Sample) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 640, 480, Phaser.AUTO, 'game');
            this.state.add('boot', Sample.State.Boot);
            this.state.add('preload', Sample.State.Preload);
            this.state.add(Sample.Stories[Sample.Stories.Story1], Sample.State.Story1);
            this.state.add(Sample.Stories[Sample.Stories.Story2], Sample.State.Story2);
            this.state.add(Sample.Stories[Sample.Stories.Story3], Sample.State.Story3);
            this.state.add(Sample.Stories[Sample.Stories.Story4], Sample.State.Story4);
            this.state.add(Sample.Levels[Sample.Levels.Zone1Level1], Sample.State.Zone1Level1);
            this.state.add(Sample.Levels[Sample.Levels.Zone2Level1], Sample.State.Zone2Level1);
            this.state.add(Sample.Levels[Sample.Levels.Zone3Level1], Sample.State.Zone3Level1);
            this.state.add(Sample.Levels[Sample.Levels.Zone4Level1], Sample.State.Zone4Level1);
            this.state.add('gameOver', Sample.State.GameOver);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Sample.Game = Game;
})(Sample || (Sample = {}));
window.onload = function () {
    /* Check localStorage */
    (function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e) {
            return false;
        }
    })();
    new Sample.Game();
};
//# sourceMappingURL=main.js.map