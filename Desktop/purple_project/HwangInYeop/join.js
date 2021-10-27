$(function () {
  // 아이디 중복확인
  $(document).on('click', '#check_id', function () {
    var mb_id = document.getElementById('mb_id')
    if (!mb_id.value) {
      $('#id_confirm').show().removeClass('ok_color').html('아이디를 입력하세요')
      mb_id.focus()
      return false
    } else {
      $.ajax({
        type: 'POST',
        url: 'id.inc.php',
        data: { mb_id: $.trim(mb_id.value) },
        success: function (result) {
          if (result == '210') {
            $('#id_confirm').show().removeClass('ok_color').html('사용 불가능한 아이디 입니다.')
            $('[name=id_check]').val('N')
          } else if (result == '310') {
            $('#id_confirm').show().addClass('ok_color').html('사용 가능한 아이디 입니다.')
            $('[name=id_check]').val('Y')
          }
        },
      })
    }
  })

  // 비밀번호 확인
  $(document).on('keyup', '[name=mb_pw_1]', function () {
    var pw = $('[name=mb_pw_1]').val()
    if (pw.length > 7 && pw.length < 21) {
      if (!str_check(pw)) {
        $('#pw_confirm').show().removeClass('ok_color').html('비밀번호는 영문+숫자+특수문자 조합으로 8~20자 이내로 설정하여 주십시오')
        $('[name=pw_check]').val('N')
      } else {
        $('#pw_confirm').show().addClass('ok_color').html('사용 가능한 비밀번호 입니다.')
        $('[name=pw_check]').val('Y')
      }
    } else {
      $('#pw_confirm').show().removeClass('ok_color').html('사용 불가능한 비밀번호 입니다')
      $('[name=pw_check]').val('N')
    }
  })

  $(document).on('keyup', '[name=mb_pw_2]', function () {
    var pw1 = $('[name=mb_pw_1]').val()
    var pw2 = $('[name=mb_pw_2]').val()

    if (pw1 != pw2) {
      $('#pw_confirm').show().removeClass('ok_color').html('비밀번호가 일치하지 않습니다.')
      $('[name=pw_match]').val('N')
    } else {
      $('#pw_confirm').show().addClass('ok_color').html('일치하는 비밀번호 입니다.')
      $('[name=pw_match]').val('Y')
    }
  })

  // 체크박스 전체 체크
  $(document).on('click', '#all_check', function () {
    if ($('#all_check').is(':checked') == true) {
      $('input:checkbox').prop('checked', true)
    } else {
      $('input:checkbox').prop('checked', false)
    }
  })

  // 전화번호
  $(document).on('keyup', '[name=mb_mobile]', function () {
    var textinput = $("[name='mb_mobile']").val()
    textinput = textinput.replace(/[^0-9]/g, '')
    var tmp = ''

    if (textinput.length > 3 && textinput.length <= 7) {
      tmp += textinput.substr(0, 3)
      tmp += '-'
      tmp += textinput.substr(3)
      $("[name='mb_mobile']").val(tmp)
    } else if (textinput.length > 7) {
      tmp += textinput.substr(0, 3)
      tmp += '-'
      tmp += textinput.substr(3, 4)
      tmp += '-'
      tmp += textinput.substr(7)
      $("[name='mb_mobile']").val(tmp)
    }
  })
})

document.cookie = 'safeCookie1=foo; SameSite=Lax'
document.cookie = 'safeCookie2=foo'
document.cookie = 'crossCookie=bar; SameSite=None; Secure'

// 숫자 콤마 함수
function numberFormat(inputNumber) {
  return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 새로고침 방지
function NotReload() {
  if ((event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || event.keyCode == 116) {
    event.keyCode = 0
    event.cancelBubble = true
    event.returnValue = false
  }
}

// Zipcode function
function daum_postcode(A, B) {
  new daum.Postcode({
    oncomplete: function (data) {
      var fullAddr = ''
      var extraAddr = ''

      if (data.userSelectedType == 'R') {
        fullAddr = data.roadAddress
      } else {
        fullAddr = data.jibunAddress
      }

      if (data.userSelectedType == 'R') {
        if (data.bname != '') {
          extraAddr += data.bname
        }
        if (data.buildingName != '') {
          extraAddr += extraAddr != '' ? ' (' + extraAddr + ')' : ''
        }
      }

      if (B == 0) {
        document.getElementById(A + 'zip').value = data.zonecode
        document.getElementById(A + 'address').value = fullAddr
        document.getElementById(A + 'address').focus()
      } else {
        document.getElementById(A + 'zip').value = data.zonecode
        document.getElementById(A + 'address').value = fullAddr
        document.getElementById(A + 'address_d').focus()
      }
    },
  }).open()
}

// 이메일 체크 함수
function check_mail(str) {
  var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  if (!reg_email.test(str)) {
    return false
  } else {
    return true
  }
}

// Link Function
function zero_link(pg_n) {
  if (pg_n == 'I') {
    location.href = '/'
  } else if (pg_n == 'N') {
    location.href = '/user/MyPage.html'
  }
}

// 비밀번호 입력값 확인 함수
function str_check(str) {
  var pattern_num = /[0-9]/
  var pattern_eng = /[a-zA-Z]/
  var pattern_spc = /[~!@#$%^&*()_+<>?:{}]/

  if (pattern_num.test(str) && pattern_eng.test(str) && pattern_spc.test(str)) {
    return true
  } else {
    return false
  }
}

function view_law(nmb) {
  window.open('/page/alow.html?ntype=' + nmb, '', 'width=800,height=600')
}

// 회원가입 함수
function join_check() {
  var frm = document.joinfrm
  if (!frm.mb_id.value) {
    alert('아이디를 입력하세요')
    frm.mb_id.focus()
    return false
  } else if (!frm.mb_pw_1.value) {
    alert('비밀번호를 입력하세요')
    frm.mb_pw_1.focus()
    return false
  } else if (!frm.mb_pw_2.value) {
    alert('비밀번호를 확인하여 주십시오')
    frm.mb_pw_2.focus()
    return false
  } else if (!frm.mb_name.value) {
    alert('이름을 입력하여 주십시오')
    frm.mb_name.focus()
    return false
  } else if (!frm.mb_mail.value) {
    alert('이메일을 입력하여 주십시오')
    frm.mb_mail.focus()
    return false
  } else if (!frm.mb_mobile.value) {
    alert('휴대폰 번호를 입력하여 주십시오')
    frm.mb_mobile.focus()
    return false
  } else if (frm.id_check.value != 'Y') {
    alert('아이디 중복확인을 해 주십시오')
    return false
  } else if (frm.pw_check.value != 'Y') {
    alert('사용가능한 비밀번호가 아닙니다.')
    return false
  } else if (frm.check_0.checked == false) {
    alert('"(필수) 만 14세 이상입니다."에 체크하여 주십시오')
    frm.check_0.focus()
    return false
  } else if (frm.check_1.checked == false) {
    alert('"(필수) 이용약관"에 동의하여 주십시오')
    frm.check_1.focus()
    return false
  } else if (frm.check_2.checked == false) {
    alert('"(필수) 전자금융거래 이용약관"에 동의하여 주십시오')
    frm.check_2.focus()
    return false
  } else if (frm.check_3.checked == false) {
    alert('"(필수) 개인정보 수집 및 이용"에 동의하여 주십시오')
    frm.check_3.focus()
    return false
  } else if (frm.check_4.checked == false) {
    alert('"(필수) 개인정보 제3자제공"에 동의하여 주십시오')
    frm.check_4.focus()
    return false
  } else {
    frm.action = '/user/page.prc.php'
    frm.submit()
  }
}

// 회원가입 함수 영문
function join_check_en() {
  var frm = document.joinfrm
  if (!frm.mb_id.value) {
    alert('Enter your ID')
    frm.mb_id.focus()
    return false
  } else if (!frm.mb_pw_1.value) {
    alert('Please enter your password')
    frm.mb_pw_1.focus()
    return false
  } else if (!frm.mb_pw_2.value) {
    alert('Please check the password')
    frm.mb_pw_2.focus()
    return false
  } else if (!frm.mb_name.value) {
    alert('Please enter your name')
    frm.mb_name.focus()
    return false
  } else if (!frm.mb_mail.value) {
    alert('Please enter your email')
    frm.mb_mail.focus()
    return false
  } else if (!frm.mb_mobile.value) {
    alert('Please enter your mobile number')
    frm.mb_mobile.focus()
    return false
  } else if (frm.id_check.value != 'Y') {
    alert('Please double check the ID')
    return false
  } else if (frm.pw_check.value != 'Y') {
    alert("It's not an available password.")
    return false
  } else {
    frm.action = '/user/page.prc.php'
    frm.submit()
  }
}
