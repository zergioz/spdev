var orderId;
var orderData;
var orderList = "nightOrderDataShort";
var elementArray = 
    {
        "ALL-check" : [""],
        "JALL-check" : [""],
        "SFG10-check" : ["#SFG10-paragraph"],
        "NSWU2-check" : ['#NSWU2-paragraph'],
        "SOW352-check" : ['#SOW352-paragraph'],
        "JSOACE-check" : ['#JSOACE-paragraph'],
        "TASKFORCE10-check": ['#TASKFORCE10-paragraph'],
        "CG-check" : ['#CG-paragraph'], 
        "HQ-check":['#HQ-paragraph'], 
        "J1-check":['#J1-paragraph'], 
        "J2-check":['#J2-paragraph'], 
        "J3-check":['#J3-paragraph'], 
        "J4-check":['#J4-paragraph'], 
        "J5-check":['#J5-paragraph'], 
        "J6-check":['#J6-paragraph'], 
        "J8-check":['#J8-paragraph'], 
        "JX-check":['#JX-paragraph'], 
        "SPECIALSTAFF-check":['#SPECIALSTAFF-paragraph'], 
        "SSD-check":['#SSD-paragraph'], 
        "AFSEA-check":['#AFSEA-paragraph']
    };
var taskCoordinatingInstructionsMeg = "HELLO From Coordinating";
var battleRythmMesg = "HELLO From battleRythm";

/* needed for pnp library */    
$pnp.setup({
    sp: {
        headers: {
            Accept: 'application/json;odata=verbose;'
        }
    }
});



/* Create name with date for oder */
var orderName = function(){
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    orderName = year+"-"+month+"-"+day;
    return orderName;
}

/*Live Update*/
$("input, textarea").keyup(function(){
     orderData = new buildOrder();
     console.log(orderData);
});

/* When click Initiate Order */
$('#initiateOrder').click(function(){
    console.log('initiateOrder');
    /* Create Data Set */
    var dataSet = {Title: orderName()};
    /* submit item to SPlist*/
    initiateOrder(dataSet);
    
});

/* When click Initiate Order */
function initiateOrder(dataSet){
    //INSIDE button click
    var web = new $pnp.Web(_spPageContextInfo.webAbsoluteUrl);
    // Using POST method to create an item as example
    web.getList(`${_spPageContextInfo.webServerRelativeUrl}/Lists/${orderList}`)
    .items.add(dataSet)
    .then(function (response) {
        orderId = response.data.Id;
        console.log("initiateOrder " + orderId);
    })
}

/* Populate order Ids */
function getOrder(){
     //INSIDE button click
    var web = new $pnp.Web(_spPageContextInfo.webAbsoluteUrl);
    // Using POST method to create an item as example
    web.getList(`${_spPageContextInfo.webServerRelativeUrl}/Lists/${orderList}`)
    .items.select(  "ID", "Title", "generalSubject", "generalTitle" )
    .filter("releaseOrder eq 0")
    .orderBy("Modified", true)
    .get()
    .then(function (item){
        $.each(item, function( index, value ) {
            addOrderHTML(value.ID,value.Title,value.generalSubject,value.generalTitle);
        });
    });
}

function getOrderDetail(orderId){
    console.log('getOrderDetail: '+ orderId);
     //INSIDE button click
    var web = new $pnp.Web(_spPageContextInfo.webAbsoluteUrl);
    // Using POST method to create an item as example
    web.getList(`${_spPageContextInfo.webServerRelativeUrl}/Lists/${orderList}`)
    .items
    .select(    "ID",
                "Title",
                "generalSubject",
                "generalTitle",
                "generalReferenceField",   
                "taskStaffCg",         
                "taskOrganizationJSOACE",      
                "taskStaffJ1",         
                "taskOrganizationSFG10",       
                "taskOrganizationSOW352",      
                "taskOrganizationTASKFORCE10",         
                "taskStaffJ5",         
                "taskStaffJ6",         
                "taskStaffJ8",         
                "taskStaffJx",         
                "taskStaffMed",        
                "taskStaffOther",      
                "taskStaffPao",        
                "taskStaffSja",        
                "taskStaffSsd",        
                "releaseOrder",    
                "taskStaffJ4",         
                "taskOrganizationAll",         
                "taskOrganizationNSWU2",       
                "taskStaffHq", 
                "taskStaffJ2",         
                "taskStaffJ3",         
                "taskStaffAfSea",      
                "battleRythm",        
                "taskCoordinatingInstructions")
    .filter("ID eq "+orderId)
    .get()
    .then(function(item){
        console.log(item);
        $("#generalSubject").val(item[0].generalSubject);
        $("#generalTitle").val(item[0].generalTitle); 
        $("#referenceField").val(item[0].generalReferenceField);
        $("#taskOrganizationAll").val(item[0].taskOrganizationAll);          
        $("#taskOrganizationJSOACE").val(item[0].taskOrganizationJSOACE);     
        $("#taskOrganizationNSWU2").val(item[0].taskOrganizationNSWU2);     
        $("#taskOrganizationSFG10").val(item[0].taskOrganizationSFG10);     
        $("#taskOrganizationSOW352").val(item[0].taskOrganizationSOW352);     
        $("#taskOrganizationTASKFORCE10").val(item[0].taskOrganizationTASKFORCE10);
        $("#taskStaffCg").val(item[0].taskStaffCg);         
        $("#taskStaffHq").val(item[0].taskStaffHq);  
        $("#taskStaffJ1").val(item[0].taskStaffJ1);          
        $("#taskStaffJ2").val(item[0].taskStaffJ2);          
        $("#taskStaffJ3").val(item[0].taskStaffJ3);
        $("#taskStaffJ4").val(item[0].taskStaffJ4);          
        $("#taskStaffJ5").val(item[0].taskStaffJ5);        
        $("#taskStaffJ6").val(item[0].taskStaffJ6);        
        $("#taskStaffJ8").val(item[0].taskStaffJ8);         
        $("#taskStaffJx").val(item[0].taskStaffJx);          
        $("#taskStaffMed").val(item[0].taskStaffMed);         
        $("#taskStaffOther").val(item[0].taskStaffOther);       
        $("#taskStaffPao").val(item[0].taskStaffPao);         
        $("#taskStaffSja").val(item[0].taskStaffSja);         
        $("#taskStaffSsd").val(item[0].taskStaffSsd);                  
        $("#taskStaffAfSea").val(item[0].taskStaffAfSea);
        $("#battleRythm").val(item[0].battleRythm);         
        $("#taskCoordinatingInstructions").val(item[0].taskCoordinatingInstructions); 
    });
}

function addOrderHTML(orderId,orderDate,orderTitle,orderSubject){
    var row = " <tr>\
                    <th scope='row'>"+orderDate+"</a></th>\
                    <td>"+orderTitle+"</a></td>\
                    <td>"+orderSubject+"</a></td>\
                    <th>\
                        <div class='form-group md-form form-lg'>\
                            <div class='f1-buttons'>\
                                <button type='button' class='btn btn-next' id='reviewButton' value='"+orderId+"'>Review</button>\
                            </div>\
                        </div>\
                    </th>\
                </tr>";   
    $("#orderlist").append(row);
}

/* When order is release create a file in the product library */
 function releaseOrder(dataSet){  
     //INSIDE button click
    var web = new $pnp.Web(_spPageContextInfo.webAbsoluteUrl);
    // Using POST method to create an item as example
    web.getList(`${_spPageContextInfo.webServerRelativeUrl}/nightOrder`)
    var templateUrl = '/SERROD/Shared Documents/Document.docx';
    var targetUrl = '/SERROD/nightOrder/'+orderName+'.docx' ;   

    web.getFileByServerRelativeUrl(templateUrl)
    .copyTo(targetUrl)
    .then(templateData => {
        return web.getFileByServerRelativeUrl(targetUrl)
        .getItem();
    })
    .then(item => { 
        item.update(
            { 
                FieldName:  'copyNumber', 
                FieldValue: 'My new Number' 
            }, true);
    })
    .then(console.log);
}

/* Start filling out form */
$('#generalOrder').click(function(){
    console.log('generalOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            generalSubject: orderData.generalSubject,
            generalTitle: orderData.generalTitle,
            generalCopyNumber: orderData.generalCopyNumber,
            generalEffectiveDate: orderData.generalEffectiveDate,
            generalIssuingHeadquarter: orderData.generalIssuingHeadquarter,
            generalOperationPlan: orderData.generalOperationPlan,
            generalPlaceIssue: orderData.generalPlaceIssue,
            generalReferenceField: orderData.generalReferenceField
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#generalOrder-short, #generalSaveOrder').click(function(){
    console.log('generalOrder-short');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            generalSubject: orderData.generalSubject,
            generalTitle: orderData.generalTitle,
            generalReferenceField: orderData.generalReferenceField
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#orderTask-short, #orderSaveTask').click(function(){
    console.log('generalOrder-short');
    orderData = new buildOrder();
    /* Create Data Set */
    /* Create Data Set */
    var dataSet =  
        {
            /* Tasks: Org */
            taskOrganizationAll: orderData.taskOrganizationAll,
            taskOrganizationSFG10: orderData.taskOrganizationSFG10,
            taskOrganizationNSWU2: orderData.taskOrganizationNSWU2,
            taskOrganizationSOW352: orderData.taskOrganizationSOW352,
            taskOrganizationJSOACE: orderData.taskOrganizationJSOACE,
            taskOrganizationTASKFORCE10: orderData.taskOrganizationTASKFORCE10,
            /* Tasks: Staff */
            taskStaffHq: orderData.taskStaffHq,
            taskStaffCg: orderData.taskStaffCg,
            taskStaffJ1: orderData.taskStaffJ1,
            taskStaffJ2: orderData.taskStaffJ2,
            taskStaffJ3: orderData.taskStaffJ3,
            taskStaffJ4: orderData.taskStaffJ4,
            taskStaffJ5: orderData.taskStaffJ5,
            taskStaffJ6: orderData.taskStaffJ6,
            taskStaffJ8: orderData.taskStaffJ8,
            taskStaffJx: orderData.taskStaffJx,
            taskStaffMed: orderData.taskStaffMed,
            taskStaffPao: orderData.taskStaffPao,
            taskStaffSja: orderData.taskStaffSja,
            taskStaffOther: orderData.taskStaffOther,
            taskStaffSsd: orderData.taskStaffSsd,
            taskStaffAfSea: orderData.taskStaffAfSea
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#battleRythmOrder, #battleRythmSaveOrder').click(function(){
    console.log('battleRythm');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            battleRythm: orderData.battleRythm,
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#situationOrder').click(function(){
    console.log('situationOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            situationGeneral: orderData.situationGeneral,
            situationAreaOfConcern: orderData.situationAreaOfConcern,
            situationFriendForce: orderData.situationFriendForce,
            situationEnemyForce: orderData.situationEnemyForce
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});


$('#situationOrder').click(function(){
    console.log('situationOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            situationGeneral: orderData.situationGeneral,
            situationAreaOfConcern: orderData.situationAreaOfConcern,
            situationFriendForce: orderData.situationFriendForce,
            situationEnemyForce: orderData.situationEnemyForce
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#missionOrder').click(function(){
    console.log('situationOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            missionField: orderData.missionField
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#executionOrder, #saveExecutionOrder').click(function(){
    console.log('situationOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            conopCommanderIntent: orderData.conopCommanderIntent,
            conopsPurposeState: orderData.conopsPurposeState,
            conopObjective: orderData.conopObjective,
            conopEffect: orderData.conopEffect,
            conopGeneral: orderData.conopGeneral,
            /* Tasks: Org */
            taskOrganizationAll: orderData.taskOrganizationAll,
            taskOrganizationSFG10: orderData.taskOrganizationSFG10,
            taskOrganizationNSWU2: orderData.taskOrganizationNSWU2,
            taskOrganizationSOW352: orderData.taskOrganizationSOW352,
            taskOrganizationJSOACE: orderData.taskOrganizationJSOACE,
            taskOrganizationTASKFORCE10: orderData.taskOrganizationTASKFORCE10,
            /* Tasks: Staff */
            taskStaffHq: orderData.taskStaffHq,
            taskStaffCg: orderData.taskStaffCg,
            taskStaffJ1: orderData.taskStaffJ1,
            taskStaffJ2: orderData.taskStaffJ2,
            taskStaffJ3: orderData.taskStaffJ3,
            taskStaffJ4: orderData.taskStaffJ4,
            taskStaffJ5: orderData.taskStaffJ5,
            taskStaffJ6: orderData.taskStaffJ6,
            taskStaffJ8: orderData.taskStaffJ8,
            taskStaffJx: orderData.taskStaffJx,
            taskStaffMed: orderData.taskStaffMed,
            taskStaffPao: orderData.taskStaffPao,
            taskStaffSja: orderData.taskStaffSja,
            taskStaffOther: orderData.taskStaffOther,
            taskStaffSsd: orderData.taskStaffSsd,
            taskStaffAfSea: orderData.taskStaffAfSea,
            /* Task: Coordinating */
            taskCoordinatingInstructions: orderData.taskCoordinatingInstructions
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#adminLogOrder').click(function(){
    console.log('adminLogOrder');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet =  
        {
            adminLogConceptSustainment: orderData.adminLogConceptSustainment,
            adminLogLogistic: orderData.adminLogConceptSustainment,
            adminLogPersonnel: orderData.adminLogConceptSustainment
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

$('#commandControl').click(function(){
    console.log('commandControl');
    orderData = new buildOrder();
    /* Create Data Set */
    var dataSet = 
        { 
            commandControl: orderData.commandControl,
            commandCommunications: orderData.commandCommunications
        };
    /* submit item to SPlist*/
    putOrder(dataSet);
});

/* update order*/
function putOrder(dataSet){
    /* DEBUG */
    console.log("function: putOrder for Id: ", orderId);
    //INSIDE button click
    var web = new $pnp.Web(_spPageContextInfo.webAbsoluteUrl);
    // Using POST method to create an item as example
    web.getList(`${_spPageContextInfo.webServerRelativeUrl}/Lists/${orderList}`)
        .items.getById(orderId).update(dataSet)
        .then(function (response) {
            console.log("response ",response.data);
    })
}
/* Pre-populate battleRythm coordinatingIstruction fields are empty */
function prePopulate(){
    $("#battleRythm").val(battleRythmMesg);
    $("#taskCoordinatingInstructions").val(taskCoordinatingInstructionsMeg);
}


/* Toggle input areas */
$("[id$=check]").change(function(){
    var id  = this.id;
    var  doc = [elementArray[this.id][0]]
    this.checked ? $(doc[0]).slideDown('slow') : $(doc[0]).slideUp('slow');
});

/* Enable Show All options */
$('#ALL-check, #JALL-check').change(function(){
        this.checked ? showAllOrganization(): hideAllOrganizations();
});

/* Hide All */
function hideAllOrganizations(){
    $.each(elementArray, function (index, value) {
        $(value[0]).slideUp('slow');
        $("#"+index).removeAttr('checked');
    }); 
}

/* Show All */
function showAllOrganization(){
    $.each(elementArray, function (index, value) {
        $(value[0]).slideDown('slow');
        $("#"+index).prop('checked', 'checked');
    });    
}

/* Update content with variables */
function buildOrder(){ 
    /* General pane */
    this.generalSubject = $("#generalSubject").val();
    this.generalTitle = $("#generalTitle").val();
    this.generalCopyNumber = $("#copyNumber").val();
    this.generalIssuingHeadquarter = $("#issuingHeadquarter").val();
    this.generalPlaceIssue = $("#placeIssue").val();
    this.generalEffectiveDate = $("#effectiveDate").val();
    this.generalOperationPlan = $("#operationPlan").val();
    this.generalReferenceField = $("#referenceField").val();
    /* Situation pane */
    this.situationGeneral = $("#situationGeneral").val();
    this.situationAreaOfConcern = $("#situationAreaOfConcern").val();
    this.situationFriendForce = $("#situationFriendForce").val();
    this.situationEnemyForce = $("#situationEnemyForce").val();
    /* Mission pane */
    this.missionField = $("#missionField").val();
    /* Concept of Operations */
    this.conopCommanderIntent = $("#commanderIntent").val();
    this.conopsPurposeState = $("#purposeState").val();
    this.conopObjective = $("#conopObjective").val();
    this.conopEffect = $("#conopEffect").val();
    this.conopGeneral = $("#conopGeneral").val();
    /* Tasks: Org */
    this.taskOrganizationAll = $("#taskAll").val();
    this.taskOrganizationSFG10 = $("#SFG10").val();
    this.taskOrganizationNSWU2 = $("#NSWU2").val();
    this.taskOrganizationSOW352 = $("#SOW352").val();
    this.taskOrganizationJSOACE = $("#JSOACE").val();
    this.taskOrganizationTASKFORCE10 = $("#TASKFORCE10").val();
    /* Tasks: Staff */
    this.taskStaffHq = $("#HQ").val();
    this.taskStaffCg = $("#CG").val();
    this.taskStaffJ1 = $("#J1").val();
    this.taskStaffJ2 = $("#J2").val();
    this.taskStaffJ3 = $("#J3").val();
    this.taskStaffJ4 = $("#J4").val();
    this.taskStaffJ5 = $("#J5").val();
    this.taskStaffJ6 = $("#J6").val();
    this.taskStaffJ8 = $("#J8").val();
    this.taskStaffJx = $("#JX").val();
    this.taskStaffMed = $("#SPECIALSTAFF-MED").val();
    this.taskStaffPao = $("#SPECIALSTAFF-PAO").val();
    this.taskStaffSja = $("#SPECIALSTAFF-SJA").val();
    this.taskStaffOther = $("#SPECIALSTAFF-OTHER").val();
    this.taskStaffSsd = $("#SSD").val();
    this.taskStaffAfSea = $("#AFSEA").val();
    /* Battle Rythm */
    this.battleRythm = $("#battleRythm").val();
    /* Task: Coordinating */
    this.taskCoordinatingInstructions = $("#coordinatingInstructions").val();
    /* Admin and Logistics */
    this.adminLogConceptSustainment = $("#AdminLogConceptSustainment").val();
    this.adminLogLogistic = $("#adminLogLogistic").val();
    this.adminLogPersonnel = $("#adminLogpersonnel").val();
    /* Command and Control */
    this.commandControl = $("#commandControl").val();
    this.commandCommunications = $("#commandCommunications").val();
    /* Release Status */
    this.releaseOrder = $("#release").val();

    return this;
};

function scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
}

function bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
        new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
        new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
}

$(document).ready(function() {
    // Fullscreen background 
    $.backstretch("assets/img/backgrounds/1.jpg");
    
    // Hide input texts */
    $.each(elementArray, function (index, value) {
        $(value[0]).hide();
    });
    
    // Make all  inputs and textarea active*/
    var inputList = $(document).find('input, textarea');
    $.each(inputList, function (index, value) {
        $('#'+value.id).val() ? $('label[for='+value.id+']').addClass( "active" ): false;
    });
    
    // Resize top nav
    $('#top-navbar-1').on('shown.bs.collapse', function(){
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function(){
        $.backstretch("resize");
    });
    
    // Form 
    $('.f1 fieldset:first').fadeIn('slow');
    $('.f1 input[type="text"], .f1 textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });
    // Next step
    $('.f1 .btn-next').on('click', function() {
        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        
        // Fields validation
        parent_fieldset.find('input[type="text"], textarea').each(function() {
            if( $(this).val() == "" ) {
                $(this).addClass('input-error');
                //next_step = false; // it was disabled, but feature will stop from going next if information is missing
                next_step = true;
            }
            else {
                $(this).removeClass('input-error');
            }
        });
        
        // Fields validation
        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.f1'), 20 );
            });
        }
    });

    // Previous step
    $('.f1 .btn-previous').on('click', function() {
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        
        $(this).parents('fieldset').fadeOut(400, function() {
            // change icons
            current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
            // progress bar
            bar_progress(progress_line, 'left');
            // show previous step
            $(this).prev().fadeIn();
            // scroll window to beginning of the form
            scroll_to_class( $('.f1'), 20 );
        });
    });

    // Submit
    $('.f1 .btn-submit').on('click', function(e) {    // submit
        console.log('release commandControl');
        orderData = new buildOrder();
        var dataSet = 
        { 
            releaseOrder: orderData.releaseOrder
        };
        putOrder(dataSet);
        /*releaseOrder(); this directive created a file into a different library needs to be fixed and thus commented out*/ 
    });

    // review step
    $('body').on('click', '#reviewButton', function() {
        console.log(this.value);
        orderId = this.value;
        // get all order details and laod to DOM
        getOrderDetail(orderId);

        var parent_fieldset = $(this).parents('fieldset');
        var next_step = true;
        // navigation steps / progress steps
        var current_active_step = $(this).parents('.f1').find('.f1-step.active');
        var progress_line = $(this).parents('.f1').find('.f1-progress-line');
        
        // fields validation
        if( next_step ) {
            parent_fieldset.fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                // progress bar
                bar_progress(progress_line, 'right');
                // show next step
                $(this).next().fadeIn();
                // scroll window to beginning of the form
                scroll_to_class( $('.f1'), 20 );
            });
        }
    });
});
