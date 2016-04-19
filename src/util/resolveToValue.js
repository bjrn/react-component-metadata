import * as t from 'babel-types';

let find = require('lodash/find');

let isResolvable = node => t.isObjectExpression(node) || t.isLiteral(node)

function resolveToValue(node, scope, resolve = isResolvable){


  if (resolve(node, scope)) {
    //console.log('resolved', node, scope)
    return node
  }
  else if( t.isAssignmentExpression(node)){
    return resolveToValue(node.right, scope, resolve)
  }
  else if ( t.isVariableDeclarator(node) ) {
    return resolveToValue(node.init, scope, resolve)
  }
  else if( t.isMemberExpression(node)) {
    while (node && t.isMemberExpression(node)) {
      node = node.object;
    }

    return resolveToValue(node, scope, resolve)
  }
  else if ( t.isIdentifier(node) ){
    var name = node.name
      , binding = scope.getBinding(name)

    if (!binding) {
      return node
    }

    node = binding.path.container[binding.path.key]

    if (t.isVariableDeclaration(node)) {
      node = find(node.declarations, d => d.id.name === name)
    }
    // destructuring
    if (t.isObjectPattern(node.id) ) {
      var prop = find(node.id.properties, p => p.value && p.value.name === name)

      node = t.memberExpression(node.init, t.identifier(prop.key.name))
    }

    //console.log('ident')
    return resolveToValue(node, binding.scope, resolve)
  }
  else {
    //console.log('not resolved', node.type, node._paths[0].parentPath)
  }
}


resolveToValue.isResolvable = isResolvable

module.exports = resolveToValue

//var isReactComponentClass = require('./isReactComponentClass')
