#!/usr/bin/env perl
use strict;
use warnings;
use IO::Socket::INET;

$| = 1;
$SIG{PIPE} = 'IGNORE';
my $port = 5500;
my $root = '/Users/prashantmishra/.gemini/antigravity/scratch/capturing-whole-world';

my %mimes = (
    html => 'text/html; charset=UTF-8',
    css  => 'text/css; charset=UTF-8',
    js   => 'application/javascript; charset=UTF-8',
    json => 'application/json',
    png  => 'image/png',
    jpg  => 'image/jpeg',
    jpeg => 'image/jpeg',
    mp4  => 'video/mp4',
    webm => 'video/webm',
    svg  => 'image/svg+xml',
    ico  => 'image/x-icon',
    woff2=> 'font/woff2',
    woff => 'font/woff',
);

my $server = IO::Socket::INET->new(
    LocalAddr => '127.0.0.1',
    LocalPort => $port,
    Proto     => 'tcp',
    Listen    => 10,
    ReuseAddr => 1,
) or die "Cannot bind to port $port: $!\n";

print "HTTP server listening at http://localhost:$port/\n";

while (my $client = $server->accept()) {
    my $req = <$client>;
    next unless $req;
    
    my $range_header = '';
    while (my $line = <$client>) {
        if ($line =~ /^Range:\s*bytes=(\d*)-(\d*)/i) {
            $range_header = $line;
        }
        last if $line =~ /^\r?\n$/;
    }

    if ($req =~ /^(GET|HEAD)\s+([^\s?]+)/) {
        my $method = $1;
        my $path = $2;
        $path = '/index.html' if $path eq '/' or $path eq '';
        $path =~ s/\.\.//g; # sanitize traversal

        my $file = "$root$path";
        if (!-f $file && $path =~ /capturingwholeworld-logo\.svg$/) {
            $file = "$root/assets/images/logo.png";
        }
        if (-f $file && open(my $fh, '<:raw', $file)) {
            my ($ext) = $file =~ /\.([^.]+)$/;
            $ext = lc($ext || '');
            my $mime = $mimes{$ext} || 'application/octet-stream';
            
            read($fh, my $magic3, 3);
            seek($fh, 0, 0);
            if (defined $magic3 && $magic3 eq "\xFF\xD8\xFF") {
                $mime = 'image/jpeg';
            }
            my $total_size = -s $file;

            if ($range_header =~ /bytes=(\d*)-(\d*)/i) {
                my ($r_start, $r_end) = ($1, $2);
                my ($start, $end);
                if (length($r_start) && length($r_end)) {
                    $start = int($r_start);
                    $end   = int($r_end);
                } elsif (length($r_start)) {
                    $start = int($r_start);
                    my $chunk = 4 * 1024 * 1024; # 4MB chunk for responsive video streaming
                    $end   = $start + $chunk - 1;
                    $end   = $total_size - 1 if $end >= $total_size;
                } elsif (length($r_end)) {
                    $start = $total_size - int($r_end);
                    $start = 0 if $start < 0;
                    $end   = $total_size - 1;
                } else {
                    $start = 0;
                    $end   = $total_size - 1;
                }
                $end = $total_size - 1 if $end >= $total_size;

                my $length = ($end >= $start) ? ($end - $start + 1) : 0;
                seek($fh, $start, 0);

                print $client "HTTP/1.1 206 Partial Content\r\n";
                print $client "Content-Type: $mime\r\n";
                print $client "Content-Range: bytes $start-$end/$total_size\r\n";
                print $client "Content-Length: $length\r\n";
                print $client "Accept-Ranges: bytes\r\n";
                print $client "Access-Control-Allow-Origin: *\r\n";
                print $client "Connection: close\r\n\r\n";

                if ($method eq 'GET') {
                    my $bytes_left = $length;
                    while ($bytes_left > 0 && read($fh, my $buf, ($bytes_left > 65536 ? 65536 : $bytes_left))) {
                        my $written = syswrite($client, $buf);
                        last unless defined $written && $written > 0;
                        $bytes_left -= $written;
                    }
                }
            } else {
                print $client "HTTP/1.1 200 OK\r\n";
                print $client "Content-Type: $mime\r\n";
                print $client "Content-Length: $total_size\r\n";
                print $client "Accept-Ranges: bytes\r\n";
                print $client "Access-Control-Allow-Origin: *\r\n";
                print $client "Connection: close\r\n\r\n";

                if ($method eq 'GET') {
                    while (read($fh, my $buf, 65536)) {
                        syswrite($client, $buf);
                    }
                }
            }
            close($fh);
        } else {
            my $msg = "404 Not Found";
            print $client "HTTP/1.1 404 Not Found\r\n";
            print $client "Content-Type: text/plain\r\n";
            print $client "Content-Length: " . length($msg) . "\r\n";
            print $client "Connection: close\r\n\r\n$msg";
        }
    }
    close($client);
}
