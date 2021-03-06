

/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */


export default function(THREE) {

    return function ( object, domElement, opts ) {

        this.object = object;

        opts = opts || {};

        this.domElement = ( domElement !== undefined ) ? domElement : document;
        if ( domElement ) this.domElement.setAttribute( 'tabindex', -1 );

        // API

        this.movementSpeed = (opts.movementSpeed === undefined) ? 1.0 : opts.movementSpeed;
        this.rollSpeed = (opts.rollSpeed === undefined) ? 0.005 : opts.rollSpeed;

        this.autoForward = true;

        // disable default target object behavior

        // internals

        this.tmpQuaternion = new THREE.Quaternion();

        this.moveState = { up: 0, down: 0, left: 0, right: 0, forward: 0, back: 0, pitchUp: 0, pitchDown: 0, yawLeft: 0, yawRight: 0, rollLeft: 0, rollRight: 0 };
        this.moveVector = new THREE.Vector3( 0, 0, 0 );
        this.rotationVector = new THREE.Vector3( 0, 0, 0 );

        var prevTime = Date.now();


        this.handleEvent = function ( event ) {

            if ( typeof this[ event.type ] == 'function' ) {

                this[ event.type ]( event );

            }

        };

        this.keydown = function( event ) {

            if ( event.altKey ) {

                return;

            }



            switch ( event.keyCode ) {

                case 65: /*A*/ this.moveState.left = 1; break;
                case 68: /*D*/ this.moveState.right = 1; break;

                case 87: /*W*/ this.moveState.up = 1; break;
                case 83: /*S*/ this.moveState.down = 1; break;

                case 81: /*Q*/ this.moveState.rollLeft = 1; break;
                case 69: /*E*/ this.moveState.rollRight = 1; break;

            }

            var surpress = [38, 40, 37, 39];

            if(surpress.indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }

            this.updateMovementVector();
            this.updateRotationVector();

        };

        this.keyup = function( event ) {

            switch( event.keyCode ) {

                case 65: /*A*/ this.moveState.left = 0; break;
                case 68: /*D*/ this.moveState.right = 0; break;

                case 87: /*W*/ this.moveState.up = 0; break;
                case 83: /*S*/ this.moveState.down = 0; break;

                case 81: /*Q*/ this.moveState.rollLeft = 0; break;
                case 69: /*E*/ this.moveState.rollRight = 0; break;

            }

            this.updateMovementVector();
            this.updateRotationVector();

        };

        this.update = function( delta ) {

            var time = Date.now();
            var delta = ( time - prevTime ) / 10;

            var moveMult = delta * this.movementSpeed;
            var rotMult = delta * this.rollSpeed;

            this.object.translateX( this.moveVector.x * moveMult );
            this.object.translateY( this.moveVector.y * moveMult );
            this.object.translateZ( this.moveVector.z * moveMult );

            this.tmpQuaternion.set( this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1 ).normalize();
            this.object.quaternion.multiply( this.tmpQuaternion );

            this.object.rotation.setFromQuaternion( this.object.quaternion, this.object.rotation.order );

            prevTime = time;
        };

        this.updateMovementVector = function() {

            var forward = ( this.moveState.forward || ( this.autoForward && !this.moveState.back ) ) ? 1 : 0;

            this.moveVector.x = ( -this.moveState.left    + this.moveState.right );
            this.moveVector.y = ( -this.moveState.down    + this.moveState.up );
            this.moveVector.z = ( -forward + this.moveState.back );

        };

        this.updateRotationVector = function() {

            this.rotationVector.x = ( -this.moveState.pitchDown + this.moveState.pitchUp );
            this.rotationVector.y = ( -this.moveState.yawRight  + this.moveState.yawLeft );
            this.rotationVector.z = ( -this.moveState.rollRight + this.moveState.rollLeft );

        };

        function bind( scope, fn ) {

            return function () {

                fn.apply( scope, arguments );

            };

        };

        this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

        this.domElement.addEventListener( 'keydown', bind( this, this.keydown ), false );
        this.domElement.addEventListener( 'keyup',   bind( this, this.keyup ), false );

        this.updateMovementVector();
        this.updateRotationVector();
    };

};
