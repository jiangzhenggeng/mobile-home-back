<script type="text/javascript">

  if(!window.URL) window.URL = {};
  window.URL['login'] = window.URL['uid'] = "<?php echo $_SESSION['uid'];?>";
  window.URL['ioid'] = "<?php echo $_SESSION['uid'] . '&' . md5('news' . $_SESSION['uid']);?>";
  window.URL['user-face'] = "<?php echo Common::getFace(Yii::app()->session['uid']);?>/230x230";
</script>