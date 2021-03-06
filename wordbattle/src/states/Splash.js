/* The Distance Teaching and Mobile learning licenses this file
to you under the Apache License, Version 2.0 (the "License"); 
you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

import Phaser from 'phaser'
import {centerGameObjects} from '../utils'
import PhaserInput from '../libs/phaser-input'
import PhaserJuicy from '../libs/juicy'
import {flags, languages} from '../sprites/Flags'
import config from '../config';
import WebFont from 'webfontloader'


export default class extends Phaser.State {
    init() {
    }

    preload() {

        //this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
        //centerGameObjects()

        //this.load.setPreloadSprite()
        this.load.onLoadStart.add(this.loadStart, this);
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);

        this.add.plugin(PhaserInput.Plugin);
        this.add.plugin(PhaserJuicy);
        this.game.juicy = this.add.plugin(new PhaserJuicy(this))
        //
        // load your assets
        if (config.webfonts.length) {
            WebFont.load({
                google: {
                    families: config.webfonts
                },
                active: this.fontsLoaded
            })
        }

        this.load.image('mushroom', 'assets/images/mushroom2.png')
         this.load.atlas('wizard', 'assets/images/wizard/atlas.png', 'assets/images/wizard/atlas.json')
        this.load.xml('wizardAnimations', 'assets/images/wizard/animations.scml')

        this.load.atlas('gnome', 'assets/images/gnome2/atlas.png', 'assets/images/gnome2/atlas.json')
        this.load.xml('gnomeAnimations', 'assets/images/gnome2/animations.scml')

        this.load.atlas('fireball', 'assets/images/fire/atlas.png', 'assets/images/fire/atlas.json');
        this.load.image('iconAttack', 'assets/images/icon-attack.png');
        this.load.image('iconHome', 'assets/images/icon-home.png');

        // bg
        this.load.image('bg1', 'assets/images/layers/l1_background.png')
        this.load.image('bg2', 'assets/images/layers/l2_trees01.png')
        this.load.image('bg3', 'assets/images/layers/l3_bush01.png')
        this.load.image('bg4', 'assets/images/layers/l4_trees02.png')
        this.load.image('bg5', 'assets/images/layers/l5_trees03.png')
        this.load.image('bg6', 'assets/images/layers/l6_bush02.png')
        this.load.image('bg7', 'assets/images/layers/l7_ground.png')
         this.load.image('cloud', 'assets/images/cloud.png');
        this.load.image('scroll', 'assets/images/scroll.png');

        // audio
        this.load.audio('gameMusic', 'assets/audio/music/music_david_gwyn_jones_teddy_comes_too_instrumental.mp3')
        this.load.audio('click', 'assets/audio/Click.wav')
        this.load.audio('explosion', 'assets/audio/Explosion.wav')
        this.load.audio('blaster', 'assets/audio/Blastwave_FX_FireballWhoosh_S08FI.42.mp3')
        this.load.audio('hover', 'assets/audio/ButtonHover.wav')
        this.load.audio('steps', 'assets/audio/LandingFootsteps.wav')
        this.load.audio('woosh', 'assets/audio/Whoosh.wav')

        this.load.atlas('flags', 'assets/images/flags/flags.png', 'assets/images/flags/flags.json')
        this.load.spritesheet('heart', 'assets/images/ss-heart.png', 48, 48, 6)
    }

    loadStart() {
        this.loadingText = this.add.text(this.game.world.centerX-140, this.game.world.centerY - 140, 'Loading...', {
            font: '20px Berkshire Swash',
            fill: '#ffffff'
        });
    }

    fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText('Loading: ' + progress + '% - ' + totalLoaded + ' out of ' + totalFiles);
    }

    loadComplete() {
        game.world.remove(this.loadingText);
		document.querySelector('#logo').style.display = 'none'
        this.state.start('Menu')
    }

    create() {

    }

    fontsLoaded() {
        this.fontsReady = true
    }
}
