<?php

if(Yii::app()->controller->id=='index'){
    echo '极果-全球好物消费推荐平台';
}else{
    echo CHtml::encode($this->pageTitle).'-极果';
}

?>