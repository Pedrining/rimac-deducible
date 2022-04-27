module.exports = { 
    copiar : function( obj1, obj2 ) {
        
        if ( obj2 === null || typeof obj2  !== 'object' ) {
            return obj2;
        }
        //var temp = obj.constructor();
        for ( var key in obj2 ) {
            obj1[ key ] = this.copiar( obj1, obj2[ key ] );
        } 
    },

};