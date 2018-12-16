var audit = {
    dated: null,
    operation: null
};

audit.prototype.create = ( operation ) => {
    if( !operation ) {
        return false;
    }

    this.audit.dated = new Date();
    this.audit.operation = operation;
}