'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">back documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AboutModule.html" data-type="entity-link" >AboutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' : 'data-target="#xs-controllers-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' :
                                            'id="xs-controllers-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' }>
                                            <li class="link">
                                                <a href="controllers/AboutController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' : 'data-target="#xs-injectables-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' :
                                        'id="xs-injectables-links-module-AboutModule-2d342cdc075cde95b3db04f4068923536a79beb4f0045ed260faaeb03af472d55d8e18f8d7b5dd3e5f9d0c7cef8394112f767a596abef2721aa95f5b8c268d58"' }>
                                        <li class="link">
                                            <a href="injectables/AboutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ActionsModule.html" data-type="entity-link" >ActionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' : 'data-target="#xs-controllers-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' :
                                            'id="xs-controllers-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' }>
                                            <li class="link">
                                                <a href="controllers/ActionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' : 'data-target="#xs-injectables-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' :
                                        'id="xs-injectables-links-module-ActionsModule-04e3a68bc8620b3c996769de85750e444d7c80827587191a4dc55c29b925678f374bf528498fb13755eda5fc08f360e248baa37c652f2fd38270dd0675cc41ca"' }>
                                        <li class="link">
                                            <a href="injectables/ActionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' : 'data-target="#xs-controllers-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' :
                                            'id="xs-controllers-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ServicesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' : 'data-target="#xs-injectables-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' :
                                        'id="xs-injectables-links-module-AppModule-daaf86c1b00ab068fc0ba055d661231af57a3c65df10a22e607147240544278d59321578bcdb853c40651e3a81cb5031047ebbc716b010a483ff60f4afbc1228"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServicesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AreasModule.html" data-type="entity-link" >AreasModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' : 'data-target="#xs-controllers-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' :
                                            'id="xs-controllers-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' }>
                                            <li class="link">
                                                <a href="controllers/AreasController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreasController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' : 'data-target="#xs-injectables-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' :
                                        'id="xs-injectables-links-module-AreasModule-36e41c32fbd09ad65d39422ba13582bbebf1e8959121b0dd61507cb5430ce31903b6976a4f5ee3123b1a00261bc09cb0dfff1cdca148aa75b6c7e3fac153ec4a"' }>
                                        <li class="link">
                                            <a href="injectables/ActionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AreasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserAreas.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAreas</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' : 'data-target="#xs-controllers-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' :
                                            'id="xs-controllers-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' : 'data-target="#xs-injectables-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' :
                                        'id="xs-injectables-links-module-AuthModule-069dee53967fac50e98a81c8bbc2fe689c0485988dd3155bfe01b45eb6ba39eb1f01d2e27642c0d4c7135167022dd9e3006880d69a415529fc74aa88e602268e"' }>
                                        <li class="link">
                                            <a href="injectables/AuthStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OauthModule.html" data-type="entity-link" >OauthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' : 'data-target="#xs-controllers-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' :
                                            'id="xs-controllers-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' }>
                                            <li class="link">
                                                <a href="controllers/OauthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' : 'data-target="#xs-injectables-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' :
                                        'id="xs-injectables-links-module-OauthModule-0d4747720dae17f9fb1ddda1110300ea7504eb117731c9f618c9e72f54a7ff4611f1cfa69b14318c2748c7a25ddce97c317852abffd786ce1eb6aad94ca56fff"' }>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ReactionsModule.html" data-type="entity-link" >ReactionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' : 'data-target="#xs-controllers-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' :
                                            'id="xs-controllers-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' }>
                                            <li class="link">
                                                <a href="controllers/ReactionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReactionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' : 'data-target="#xs-injectables-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' :
                                        'id="xs-injectables-links-module-ReactionsModule-7691278d5f8d0402413ea03505c2382b7f76d71f9e291bda099c0cc6352be13443c0a03377ca89893ee8457e8eacc05522b13816b77359f70456e91f95f6d9bc"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServicesModule.html" data-type="entity-link" >ServicesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' : 'data-target="#xs-controllers-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' :
                                            'id="xs-controllers-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' }>
                                            <li class="link">
                                                <a href="controllers/ServicesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' : 'data-target="#xs-injectables-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' :
                                        'id="xs-injectables-links-module-ServicesModule-499a0170a75293cd5fbf9aff07a7851eaeae6bf33ff9dd44863213ffd70600e3a571e7d56afdd402c68ef119dc11d9054e4e1bbc1418f84dc8a9fe3ef6193a8f"' }>
                                        <li class="link">
                                            <a href="injectables/ServicesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServicesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' : 'data-target="#xs-controllers-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' :
                                            'id="xs-controllers-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' : 'data-target="#xs-injectables-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' :
                                        'id="xs-injectables-links-module-UserModule-f2fe94cab76949b3a9aa440e86346c6e09969f40aa8ae40c1faa243b4485081867e6e96316793fcca9f40b31489a75258932e7c734ed61220a6902fd5863da85"' }>
                                        <li class="link">
                                            <a href="injectables/ActionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AreasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserAreas.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserAreas</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/WebhooksModule.html" data-type="entity-link" >WebhooksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' : 'data-target="#xs-controllers-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' :
                                            'id="xs-controllers-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' }>
                                            <li class="link">
                                                <a href="controllers/WebhooksController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WebhooksController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' : 'data-target="#xs-injectables-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' :
                                        'id="xs-injectables-links-module-WebhooksModule-744b132f0e3be9f2cc88bffe9d14223eceb6666d50dcd8078b50392cc9c72a0579e923ba5d9dfb0fcdfdd99e50cbb56fff484b5610465b71403e98f5ed1221fd"' }>
                                        <li class="link">
                                            <a href="injectables/ActionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AreasService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AreasService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/OauthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OauthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/WebhooksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WebhooksService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AreaCreationDto.html" data-type="entity-link" >AreaCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AreaId.html" data-type="entity-link" >AreaId</a>
                            </li>
                            <li class="link">
                                <a href="classes/DicoDto.html" data-type="entity-link" >DicoDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DiscordMsgReactionDto.html" data-type="entity-link" >DiscordMsgReactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/EnvironmentVariables.html" data-type="entity-link" >EnvironmentVariables</a>
                            </li>
                            <li class="link">
                                <a href="classes/GithubDto.html" data-type="entity-link" >GithubDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HookCreationDto.html" data-type="entity-link" >HookCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/MailReactionDto.html" data-type="entity-link" >MailReactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthCreationDto.html" data-type="entity-link" >OauthCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OauthDictionnaryDto.html" data-type="entity-link" >OauthDictionnaryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Repository.html" data-type="entity-link" >Repository</a>
                            </li>
                            <li class="link">
                                <a href="classes/SmsReactionDto.html" data-type="entity-link" >SmsReactionDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenCreationDto.html" data-type="entity-link" >TokenCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserAuth.html" data-type="entity-link" >UserAuth</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserCreationDto.html" data-type="entity-link" >UserCreationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLoginDto.html" data-type="entity-link" >UserLoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Username.html" data-type="entity-link" >Username</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ReactionsService.html" data-type="entity-link" >ReactionsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});