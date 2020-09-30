"use strict";
const _components = {};
let _allCompProps = {};
let _mutable = {};
let styledProps = new Map();

const _getDefType = (_buildDef, _mutableSlotName, _el) => {
  try {
    ({
      string() {
        const _defElem = document.createTextNode(_buildDef);
        _el.appendChild(_defElem);
        _mutable[_mutableSlotName] = _defElem;
      },
      function() {
        const _defElem = _buildDef();
        _el.appendChild(_defElem);
        _mutable[_mutableSlotName] = _defElem;
      }
    }[typeof _buildDef]());
  } catch (error) {
    throw new Error(
      `on initializing component - Expected node or string as value. Received ${
        _buildDef instanceof Function ? typeof _buildDef() : typeof _buildDef
      } instead @ ${_mutableSlotName}.`
    ).stack;
  }
};

const _getPropType = (child, _el) =>
  ({
    true() {
      _el.appendChild(child);
    },
    false() {
      const [_mutableSlotName] = child;
      const { [_mutableSlotName]: _buildDef } = _allCompProps;
      _getDefType(_buildDef, _mutableSlotName, _el);
    }
  }[child instanceof Node]());

const _getType = (child, _el) => {
  try {
    ({
      string() {
        _el.appendChild(document.createTextNode(child));
      },
      object() {
        _getPropType(child, _el);
      }
    }[typeof child]());
  } catch (error) {
    throw new Error(
      `on initializing component - Expected node or property name in array as value. Received ${typeof child} instead.`
    ).stack;
  }
};

const _stateTypes = {
  function(obj, _key, _MyConstructor) {
    _MyConstructor.prototype[_key] = obj.states[_key];
    delete obj.states[_key];
  },
  undefined() {}
};

const _getStateType = (obj, _key, _MyConstructor) => {
  _stateTypes[typeof _stateTypes[typeof obj.states[_key]]](
    obj,
    _key,
    _MyConstructor
  );
};

const _updateProperty = (obj, key, newKey) => {
  let _val = obj[key];

  Object.defineProperty(obj, newKey, {
    get() {
      return _val;
    },
    set(newVal) {
      try {
        typeof newVal === "string"
          ? (() => {
              const _elem = document.createTextNode(newVal);
              _val.parentNode.replaceChild(_elem, _val);
              _val = _elem;
            })()
          : (() => {
              const _elem = newVal;
              _val.parentNode.replaceChild(_elem, _val);
              _val = _elem;
            })();
      } catch (error) {
        throw new Error(
          `on updating property - Expected node or string as value on '${_key}' property. Received ${typeof newVal} instead.`
        ).stack;
      }
    }
  });
};
/*------------------------------------------
*
*                   CREATE
*
---------------------------------------------*/
export const create = (elem, attr, ...children) => {
  const _el = document.createElement(elem);

  const attributesArr = attr ? Object.keys(attr) : [];

  for (let i = 0; i < attributesArr.length; i++) {
    const _key = attributesArr[i];
    _el.setAttribute(_key, attr[_key]);
  }

  for (let i = 0; i < children.length; i++) {
    _getType(children[i], _el);
  }
  return _el;
};
/*------------------------------------------
*
*                 COMPONENT
*
---------------------------------------------*/
export const component = (name, func, obj) => {
  class _MyConstructor {
    constructor(main, props, states) {
      this.main = main;

      const _propKeys = Object.keys(props),
        _statesKeys = Object.keys(states);

      for (let i = 0; i < _propKeys.length; i++) {
        const _key = _propKeys[i];
        this[_key] = _mutable[_key];

        _updateProperty(this, _key, _key);
      }
      for (let i = 0; i < _statesKeys.length; i++) {
        const _key = _statesKeys[i];
        this[_key] = states[_key];
      }
    }
  }

  const _statesObjProtos = Object.keys(obj.states);

  for (let i = 0; i < _statesObjProtos.length; i++) {
    const _key = _statesObjProtos[i];
    _getStateType(obj, _key, _MyConstructor);
  }

  _components[name] = [func, obj, _MyConstructor];

  _allCompProps = {
    ..._allCompProps,
    ...obj.props
  };
};
/*------------------------------------------
*
*               CREATE-CLONE
*
---------------------------------------------*/
export const createClone = (name, target) => {
  try {
    const _res = new _components[name][2](
      _components[name][0](),
      _components[name][1].props,
      _components[name][1].states
    );

    _res.STRIKE && _res.STRIKE();
    target && target.appendChild(_res.main);
    _mutable = {};

    return _res;
  } catch (error) {
    switch (true) {
      case !_components[name]:
        throw new Error(`on creating clone - '${name}' is not a component`)
          .stack;
      case !target instanceof Node:
        throw new Error(
          `on creating clone - Cannot append '${name}' to textNode: ${target}`
        ).stack;
      default:
        throw error;
    }
  }
};
/*------------------------------------------
*
*                   STYLE
*
---------------------------------------------*/
export const style = (obj, target) => {
  !styledProps.get(target) &&
    styledProps.set(target, {
      ...obj
    });

  const _objArr = Object.entries(obj);

  let _style = "";

  for (let i = 0; i < _objArr.length; i++) {
    styledProps.get(target)[_objArr[i][0]] = _objArr[i][1];
  }

  const _classObjArr = Object.entries(styledProps.get(target));

  for (let i = 0; i < _classObjArr.length; i++) {
    _style += `${_classObjArr[i][0]}: ${_classObjArr[i][1]};`;
  }
  target.setAttribute("style", _style);
};
/*------------------------------------------
*
*                   RENAME PROPERTY
*
---------------------------------------------*/
export const redefineProperty = (key, newKey, obj) => {
  const _entries = Object.entries(obj);

  let _iniProp = obj[key];

  _iniProp.childNodes.forEach(node => {
    _entries
      .filter(item => item[1] === node)
      .forEach(item => delete obj[item[0]]);
  });
  _iniProp = null;

  obj[newKey] = obj[key];

  _updateProperty(obj, key, newKey);

  delete obj[key];
};
/*------------------------------------------
*
*                   REMOVE? (avoid this for now)
*
---------------------------------------------*/

export const remove = elem => {
  elem.parentNode.removeChild(elem);
};
/*------------------------------------------
*
*                   ROUTER
*
---------------------------------------------*/
// window.history.pushState({ pageId: "app" }, "home", "./");
let routes = {};
export const cloneRouter = {
  routeIds: val => (routes = { ...val }),
  routeTo: pageId => {
    window.history.pushState({ pageId: pageId }, "home", "./");
  },
  route: (...pageId) => {
    pageId.forEach(id => {
      const r = routes[id];
      r.push(r[1][r[0]]);
    });
  }
};
window.addEventListener("popstate", event => {
  routes["app"][1][routes["app"][0]] = routes[event.state.pageId][2];
});
