(function ( window ) {
    window.app = window.app || {};
    var utils  = window.app.utils || {};
    
    function Model ( store ) {
        this.store = store;
    }
    
    Model.prototype.create = function ( value, cb ) {
        var newItem            = {
            id     : 'todoitem_' + utils.makeid(10),
            text   : value,
            checked: false
        };
        var listItem           = this.get() || {};
        listItem[ newItem.id ] = newItem;
        this.save(listItem);
        cb && cb(newItem);
    };
    
    Model.prototype.save = function ( payload ) {
        // 서버 API 보냄(저장)
        // 우리는 서버가 없으니까 로컬스토리지에 저장
        this.store.setItem(payload);
    };
    
    Model.prototype.get = function () {
        return this.store.getItem();
    };
    
    Model.prototype.update = function ( id, attr, cb ) {
        var items = this.get();
        var item  = items[ id ];
        items[id] = Object.assign(item, attr);
        this.save(items);
        cb && cb();
    };
    
    Model.prototype.remove = function ( id, cb ) {
        var items = this.get();
        delete items[ id ];
        this.save(items);
        cb && cb();
    };
    
    window.app.Model = Model;
})(window);