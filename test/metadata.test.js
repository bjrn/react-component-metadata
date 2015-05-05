var parseFixture = require('./helpers')

describe.only('parsing Components', () => {

  var propMetaData = {
        objProp: { 
          type: { name: 'object' }, 
          required: false, 
          desc: 'An object hash of field errors for the form.'
        },
        reqProp:{ 
          type: { name: 'object' }, 
          required: true, 
          desc: ''
        },
        funcProp: { 
          type: { name: 'func' }, 
          required: false, 
          desc: 'Callback **that** is called when a validation error occurs.',
          defaultValue: '(path, model) => getter(path)(model)'
        },
        stringProp: { 
          type: { name: 'string' }, 
          required: false, 
          desc: '',
          defaultValue: '\'form\''
        },
        boolProp: { 
          type: { name: 'bool' }, 
          required: false, 
          desc: '',
          defaultValue: 'true'
        },
        enumProp: { 
          type: { name: 'enum', value: ['true', '\'john\'', '5'] }, 
          required: false, 
          desc: ''
        }, 

        otherProp: { 
          type: { name: 'Message' }, 
          required: false, 
          desc: ''
        },

        shapeProp: { 
          type: {
            name: 'object', 
            value: {
              setter: { type: { name: 'func' }, required: false, desc: '' },
              name:   { type: { name: 'string' }, required: false, desc: '' }
            } 
          }, 
          required: false, 
          desc: '',
          defaultValue: '{ setter: ()=>{}, name: \'John\' }'
        },

        unionProp: { 
          type: { name: 'union', value: [{ name: 'func' }, { name: 'string' }] }, 
          required: false, 
          desc: ''
        },

        reqUnionProp: { 
          type: { name: 'union', value: [{ name: 'func' }, { name: 'string' }] }, 
          required: true, 
          desc: ''
        },

        customProp:  { 
          type: { name: 'custom' }, 
          required: false, 
          desc: ''
        }
      }

  it('should resolve createClass', () => {
    parseFixture('create-class').should.eql({
      ClassicComponent: {
        desc: 'Description of my Component',
        props: propMetaData
      }
    })
  })

  it('should resolve class syntax', () => {
    parseFixture('class-assigned').should.eql({
      AssignedComponent: {
        desc: 'Description of my Component',
        props: propMetaData
      }
    })
  })

  it('should resolve class syntax with static initializers', () => {
    parseFixture('class-static').should.eql({
      StaticComponent: {
        desc: 'Description of my Component',
        props: propMetaData
      }
    })
  })

  it('should resolve to binding', () => {
    var props = {
      prop: {
        type: { name: 'string' },
        required: false,
        desc: 'prop description',
        defaultValue: '\'hi!\''
      }
    }

    parseFixture('resolve').should.eql({
      ClassicComponent: {
        desc: '', props
      },

      ES6Component: {
        desc: '', props
      }
    })
  })

  it('should resolve to module', () => {
    parseFixture('resolve-module').should.eql({
      ClassicComponent: {
        desc: '', props: {}
      },

      ES6Component: {
        desc: '', props: {}
      },

      GlobalComponent: {
        desc: '', props: {}
      }
    })
  })

})
