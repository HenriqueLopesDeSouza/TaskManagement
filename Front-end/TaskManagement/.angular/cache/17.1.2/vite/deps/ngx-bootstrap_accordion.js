import {
  AnimationBuilder,
  animate,
  style
} from "./chunk-CXYZTJJZ.js";
import {
  CommonModule,
  NgClass,
  NgIf
} from "./chunk-42MLWHQO.js";
import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Injectable,
  Input,
  NgModule,
  Output,
  Renderer2,
  setClassMetadata,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-MUPCDZEB.js";
import "./chunk-SXIXOCJ4.js";

// node_modules/ngx-bootstrap/collapse/fesm2022/ngx-bootstrap-collapse.mjs
var COLLAPSE_ANIMATION_TIMING = "400ms cubic-bezier(0.4,0.0,0.2,1)";
var expandAnimation = [style({
  height: 0,
  visibility: "hidden"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: "*",
  visibility: "visible"
}))];
var collapseAnimation = [style({
  height: "*",
  visibility: "visible"
}), animate(COLLAPSE_ANIMATION_TIMING, style({
  height: 0,
  visibility: "hidden"
}))];
var _CollapseDirective = class _CollapseDirective {
  set display(value) {
    this._display = value;
    if (value === "none") {
      this.hide();
      return;
    }
    this.isAnimated ? this.toggle() : this.show();
  }
  /** A flag indicating visibility of content (shown or hidden) */
  set collapse(value) {
    this.collapseNewValue = value;
    if (!this._player || this._isAnimationDone) {
      this.isExpanded = value;
      this.toggle();
    }
  }
  get collapse() {
    return this.isExpanded;
  }
  constructor(_el, _renderer, _builder) {
    this._el = _el;
    this._renderer = _renderer;
    this.collapsed = new EventEmitter();
    this.collapses = new EventEmitter();
    this.expanded = new EventEmitter();
    this.expands = new EventEmitter();
    this.isExpanded = true;
    this.collapseNewValue = true;
    this.isCollapsed = false;
    this.isCollapse = true;
    this.isCollapsing = false;
    this.isAnimated = false;
    this._display = "block";
    this._stylesLoaded = false;
    this._COLLAPSE_ACTION_NAME = "collapse";
    this._EXPAND_ACTION_NAME = "expand";
    this._factoryCollapseAnimation = _builder.build(collapseAnimation);
    this._factoryExpandAnimation = _builder.build(expandAnimation);
  }
  ngAfterViewChecked() {
    this._stylesLoaded = true;
    if (!this._player || !this._isAnimationDone) {
      return;
    }
    this._player.reset();
    this._renderer.setStyle(this._el.nativeElement, "height", "*");
  }
  /** allows to manually toggle content visibility */
  toggle() {
    if (this.isExpanded) {
      this.hide();
    } else {
      this.show();
    }
  }
  /** allows to manually hide content */
  hide() {
    this.isCollapsing = true;
    this.isExpanded = false;
    this.isCollapsed = true;
    this.isCollapsing = false;
    this.collapses.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
        this.show();
        return;
      }
      this.collapsed.emit(this);
      this._renderer.setStyle(this._el.nativeElement, "display", "none");
    });
  }
  /** allows to manually show collapsed content */
  show() {
    this._renderer.setStyle(this._el.nativeElement, "display", this._display);
    this.isCollapsing = true;
    this.isExpanded = true;
    this.isCollapsed = false;
    this.isCollapsing = false;
    this.expands.emit(this);
    this._isAnimationDone = false;
    this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
      this._isAnimationDone = true;
      if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
        this.hide();
        return;
      }
      this.expanded.emit(this);
      this._renderer.removeStyle(this._el.nativeElement, "overflow");
    });
  }
  animationRun(isAnimated, action) {
    if (!isAnimated || !this._stylesLoaded) {
      return (callback) => callback();
    }
    this._renderer.setStyle(this._el.nativeElement, "overflow", "hidden");
    this._renderer.addClass(this._el.nativeElement, "collapse");
    const factoryAnimation = action === this._EXPAND_ACTION_NAME ? this._factoryExpandAnimation : this._factoryCollapseAnimation;
    if (this._player) {
      this._player.reset();
    }
    this._player = factoryAnimation.create(this._el.nativeElement);
    this._player.play();
    return (callback) => this._player?.onDone(callback);
  }
};
_CollapseDirective.ɵfac = function CollapseDirective_Factory(t) {
  return new (t || _CollapseDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(AnimationBuilder));
};
_CollapseDirective.ɵdir = ɵɵdefineDirective({
  type: _CollapseDirective,
  selectors: [["", "collapse", ""]],
  hostVars: 9,
  hostBindings: function CollapseDirective_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-hidden", ctx.isCollapsed);
      ɵɵclassProp("collapse", ctx.isCollapse)("in", ctx.isExpanded)("show", ctx.isExpanded)("collapsing", ctx.isCollapsing);
    }
  },
  inputs: {
    display: "display",
    isAnimated: "isAnimated",
    collapse: "collapse"
  },
  outputs: {
    collapsed: "collapsed",
    collapses: "collapses",
    expanded: "expanded",
    expands: "expands"
  },
  exportAs: ["bs-collapse"]
});
var CollapseDirective = _CollapseDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseDirective, [{
    type: Directive,
    args: [{
      selector: "[collapse]",
      exportAs: "bs-collapse",
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[class.collapse]": "true"
      }
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: AnimationBuilder
  }], {
    collapsed: [{
      type: Output
    }],
    collapses: [{
      type: Output
    }],
    expanded: [{
      type: Output
    }],
    expands: [{
      type: Output
    }],
    isExpanded: [{
      type: HostBinding,
      args: ["class.in"]
    }, {
      type: HostBinding,
      args: ["class.show"]
    }],
    isCollapsed: [{
      type: HostBinding,
      args: ["attr.aria-hidden"]
    }],
    isCollapse: [{
      type: HostBinding,
      args: ["class.collapse"]
    }],
    isCollapsing: [{
      type: HostBinding,
      args: ["class.collapsing"]
    }],
    display: [{
      type: Input
    }],
    isAnimated: [{
      type: Input
    }],
    collapse: [{
      type: Input
    }]
  });
})();
var _CollapseModule = class _CollapseModule {
  static forRoot() {
    return {
      ngModule: _CollapseModule,
      providers: []
    };
  }
};
_CollapseModule.ɵfac = function CollapseModule_Factory(t) {
  return new (t || _CollapseModule)();
};
_CollapseModule.ɵmod = ɵɵdefineNgModule({
  type: _CollapseModule,
  declarations: [CollapseDirective],
  exports: [CollapseDirective]
});
_CollapseModule.ɵinj = ɵɵdefineInjector({});
var CollapseModule = _CollapseModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollapseModule, [{
    type: NgModule,
    args: [{
      declarations: [CollapseDirective],
      exports: [CollapseDirective]
    }]
  }], null, null);
})();

// node_modules/ngx-bootstrap/accordion/fesm2022/ngx-bootstrap-accordion.mjs
var _c0 = ["*"];
var _c1 = (a0) => ({
  "text-muted": a0
});
function AccordionPanelComponent_button_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "button", 7);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c1, ctx_r0.isDisabled));
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.heading, " ");
  }
}
var _c2 = [[["", "accordion-heading", ""]], "*"];
var _c3 = ["[accordion-heading]", "*"];
var _AccordionConfig = class _AccordionConfig {
  constructor() {
    this.closeOthers = false;
    this.isAnimated = false;
  }
};
_AccordionConfig.ɵfac = function AccordionConfig_Factory(t) {
  return new (t || _AccordionConfig)();
};
_AccordionConfig.ɵprov = ɵɵdefineInjectable({
  token: _AccordionConfig,
  factory: _AccordionConfig.ɵfac,
  providedIn: "root"
});
var AccordionConfig = _AccordionConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _AccordionComponent = class _AccordionComponent {
  constructor(config) {
    this.isAnimated = false;
    this.closeOthers = false;
    this.groups = [];
    Object.assign(this, config);
  }
  closeOtherPanels(openGroup) {
    if (!this.closeOthers) {
      return;
    }
    this.groups.forEach((group) => {
      if (group !== openGroup) {
        group.isOpen = false;
      }
    });
  }
  addGroup(group) {
    group.isAnimated = this.isAnimated;
    this.groups.push(group);
  }
  removeGroup(group) {
    const index = this.groups.indexOf(group);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }
};
_AccordionComponent.ɵfac = function AccordionComponent_Factory(t) {
  return new (t || _AccordionComponent)(ɵɵdirectiveInject(AccordionConfig));
};
_AccordionComponent.ɵcmp = ɵɵdefineComponent({
  type: _AccordionComponent,
  selectors: [["accordion"]],
  hostAttrs: ["role", "tablist", 1, "panel-group", 2, "display", "block"],
  hostVars: 1,
  hostBindings: function AccordionComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-multiselectable", ctx.closeOthers);
    }
  },
  inputs: {
    isAnimated: "isAnimated",
    closeOthers: "closeOthers"
  },
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function AccordionComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2
});
var AccordionComponent = _AccordionComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionComponent, [{
    type: Component,
    args: [{
      selector: "accordion",
      template: `<ng-content></ng-content>`,
      // eslint-disable-next-line @angular-eslint/no-host-metadata-property
      host: {
        "[attr.aria-multiselectable]": "closeOthers",
        role: "tablist",
        class: "panel-group",
        style: "display: block"
      }
    }]
  }], () => [{
    type: AccordionConfig
  }], {
    isAnimated: [{
      type: Input
    }],
    closeOthers: [{
      type: Input
    }]
  });
})();
var _AccordionPanelComponent = class _AccordionPanelComponent {
  // Questionable, maybe .panel-open should be on child div.panel element?
  /** Is accordion group open or closed. This property supports two-way binding */
  get isOpen() {
    return this._isOpen;
  }
  set isOpen(value) {
    if (value !== this.isOpen) {
      if (value) {
        this.accordion.closeOtherPanels(this);
      }
      this._isOpen = value;
      Promise.resolve(null).then(() => {
        this.isOpenChange.emit(value);
      });
    }
  }
  constructor(accordion) {
    this.isAnimated = false;
    this.panelClass = "panel-default";
    this.isDisabled = false;
    this.isOpenChange = new EventEmitter();
    this._isOpen = false;
    this.accordion = accordion;
  }
  ngOnInit() {
    this.accordion.addGroup(this);
  }
  ngOnDestroy() {
    this.accordion.removeGroup(this);
  }
  toggleOpen() {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  }
};
_AccordionPanelComponent.ɵfac = function AccordionPanelComponent_Factory(t) {
  return new (t || _AccordionPanelComponent)(ɵɵdirectiveInject(AccordionComponent));
};
_AccordionPanelComponent.ɵcmp = ɵɵdefineComponent({
  type: _AccordionPanelComponent,
  selectors: [["accordion-group"], ["accordion-panel"]],
  hostAttrs: [1, "panel", 2, "display", "block"],
  hostVars: 2,
  hostBindings: function AccordionPanelComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassProp("panel-open", ctx.isOpen);
    }
  },
  inputs: {
    heading: "heading",
    panelClass: "panelClass",
    isDisabled: "isDisabled",
    isOpen: "isOpen"
  },
  outputs: {
    isOpenChange: "isOpenChange"
  },
  ngContentSelectors: _c3,
  decls: 9,
  vars: 6,
  consts: [[1, "panel", "card", 3, "ngClass"], ["role", "tab", 1, "panel-heading", "card-header", 3, "ngClass", "click"], [1, "panel-title"], ["role", "button", 1, "accordion-toggle"], ["class", "btn btn-link", "type", "button", 3, "ngClass", 4, "ngIf"], ["role", "tabpanel", 1, "panel-collapse", "collapse", 3, "collapse", "isAnimated"], [1, "panel-body", "card-block", "card-body"], ["type", "button", 1, "btn", "btn-link", 3, "ngClass"]],
  template: function AccordionPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c2);
      ɵɵelementStart(0, "div", 0)(1, "div", 1);
      ɵɵlistener("click", function AccordionPanelComponent_Template_div_click_1_listener() {
        return ctx.toggleOpen();
      });
      ɵɵelementStart(2, "div", 2)(3, "div", 3);
      ɵɵtemplate(4, AccordionPanelComponent_button_4_Template, 2, 4, "button", 4);
      ɵɵprojection(5);
      ɵɵelementEnd()()();
      ɵɵelementStart(6, "div", 5)(7, "div", 6);
      ɵɵprojection(8, 1);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵproperty("ngClass", ctx.panelClass);
      ɵɵadvance();
      ɵɵproperty("ngClass", ctx.isDisabled ? "panel-disabled" : "panel-enabled");
      ɵɵadvance(2);
      ɵɵattribute("aria-expanded", ctx.isOpen);
      ɵɵadvance();
      ɵɵproperty("ngIf", ctx.heading);
      ɵɵadvance(2);
      ɵɵproperty("collapse", !ctx.isOpen)("isAnimated", ctx.isAnimated);
    }
  },
  dependencies: [NgClass, NgIf, CollapseDirective],
  styles: ["[_nghost-%COMP%]   .card-header.panel-enabled[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]   .card-header.panel-disabled[_ngcontent-%COMP%]   .btn.btn-link[_ngcontent-%COMP%]{cursor:default;text-decoration:none}"]
});
var AccordionPanelComponent = _AccordionPanelComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionPanelComponent, [{
    type: Component,
    args: [{
      selector: "accordion-group, accordion-panel",
      host: {
        class: "panel",
        style: "display: block"
      },
      template: `<div class="panel card" [ngClass]="panelClass">
  <div
    class="panel-heading card-header"
    role="tab"
    (click)="toggleOpen()"
    [ngClass]="isDisabled ? 'panel-disabled' : 'panel-enabled'"
  >
    <div class="panel-title">
      <div role="button" class="accordion-toggle" [attr.aria-expanded]="isOpen">
        <button class="btn btn-link" *ngIf="heading" [ngClass]="{ 'text-muted': isDisabled }" type="button">
          {{ heading }}
        </button>
        <ng-content select="[accordion-heading]"></ng-content>
      </div>
    </div>
  </div>
  <div class="panel-collapse collapse" role="tabpanel" [collapse]="!isOpen" [isAnimated]="isAnimated">
    <div class="panel-body card-block card-body">
      <ng-content></ng-content>
    </div>
  </div>
</div>
`,
      styles: [":host .card-header.panel-enabled{cursor:pointer}:host .card-header.panel-disabled .btn.btn-link{cursor:default;text-decoration:none}\n"]
    }]
  }], () => [{
    type: AccordionComponent,
    decorators: [{
      type: Inject,
      args: [AccordionComponent]
    }]
  }], {
    heading: [{
      type: Input
    }],
    panelClass: [{
      type: Input
    }],
    isDisabled: [{
      type: Input
    }],
    isOpenChange: [{
      type: Output
    }],
    isOpen: [{
      type: HostBinding,
      args: ["class.panel-open"]
    }, {
      type: Input
    }]
  });
})();
var _AccordionModule = class _AccordionModule {
  static forRoot() {
    return {
      ngModule: _AccordionModule,
      providers: []
    };
  }
};
_AccordionModule.ɵfac = function AccordionModule_Factory(t) {
  return new (t || _AccordionModule)();
};
_AccordionModule.ɵmod = ɵɵdefineNgModule({
  type: _AccordionModule,
  declarations: [AccordionComponent, AccordionPanelComponent],
  imports: [CommonModule, CollapseModule],
  exports: [AccordionComponent, AccordionPanelComponent]
});
_AccordionModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule, CollapseModule]
});
var AccordionModule = _AccordionModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CollapseModule],
      declarations: [AccordionComponent, AccordionPanelComponent],
      exports: [AccordionComponent, AccordionPanelComponent]
    }]
  }], null, null);
})();
export {
  AccordionComponent,
  AccordionConfig,
  AccordionModule,
  AccordionPanelComponent
};
//# sourceMappingURL=ngx-bootstrap_accordion.js.map
